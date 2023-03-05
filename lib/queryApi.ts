import { api } from './chatGPTApi';

const chatgptQuery = async (prompt: string, parentMessageId: string) => {
  const res = await api
    .sendMessage(prompt, { parentMessageId: parentMessageId || undefined })
    .then((res) => {
      return res;
    })
    .catch();

  return res;
};

export default chatgptQuery;
