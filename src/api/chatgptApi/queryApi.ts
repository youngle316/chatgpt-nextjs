import { api } from './chatGPTApi';

const chatgptQuery = async (prompt: string, parentMessageId: string) => {
  const res = await api
    .sendMessage(prompt, {
      parentMessageId: parentMessageId || undefined,
      timeoutMs: 60 * 1000
    })
    .then((res) => {
      return res;
    })
    .catch();

  return res;
};

export default chatgptQuery;
