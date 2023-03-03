import { ChatGPTAPI } from 'chatgpt';

const chatgptQuery = async (prompt: string, parentMessageId: string) => {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY as string
  });

  const res = await api
    .sendMessage(prompt, { parentMessageId: parentMessageId || undefined })
    .then((res) => {
      return res;
    })
    .catch();

  return res;
};

export default chatgptQuery;
