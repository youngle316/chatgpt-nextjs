import { db } from '@/service/firebase/firebase';
import { serverErrorMessage } from '@/utils/message';
import {
  doc,
  DocumentData,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';

type fetchAskQuestionValue = {
  message: DocumentData;
  session: any;
  currentChatId: string;
  isGenerate?: boolean;
};

/**
 * fetch openai api
 */
const fetchAskQuestion = async ({
  message,
  session,
  currentChatId,
  isGenerate
}: fetchAskQuestionValue) => {
  fetch('/api/askQuestion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: message.prompt,
      chatId: currentChatId,
      session,
      parentMessageId: isGenerate ? undefined : message.parentMessageId,
      fireBaseMessageID: message.fireBaseMessageID
    })
  })
    .then((response) => {
      if (response.status !== 200) {
        let resultMessage = { isLoading: false, text: serverErrorMessage };
        if (!isGenerate) {
          resultMessage = Object.assign(resultMessage, {
            createAt: serverTimestamp()
          });
        }
        updateDoc(
          doc(
            db,
            'users',
            session?.user?.email!,
            'chats',
            currentChatId,
            'messages',
            message.fireBaseMessageID
          ),
          {
            ...resultMessage
          }
        );
        return false;
      }

      return response.json();
    })
    .then(async (json) => {
      if (json) {
        const { result } = json;
        let resultMessage: Message = {
          fireBaseMessageID: message.fireBaseMessageID,
          isLoading: false,
          parentMessageId: result.id || '',
          text:
            result.text ||
            'ChatGPT was unable to find an answer to your question. Please try again later.',

          user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            avatar:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/480px-ChatGPT_logo.svg.png'
          }
        };
        if (!isGenerate) {
          resultMessage = Object.assign(resultMessage, {
            createAt: serverTimestamp()
          });
        }

        await updateDoc(
          doc(
            db,
            'users',
            session?.user?.email!,
            'chats',
            currentChatId,
            'messages',
            message.fireBaseMessageID
          ),
          {
            ...resultMessage
          }
        );
      }
    });
};

export { fetchAskQuestion };
