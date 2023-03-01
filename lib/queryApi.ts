import { ChatGPTAPI } from 'chatgpt';

const chatgptQuery = async (prompt: string) => {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY || ''
  });

  const res = await api
    .sendMessage(prompt)
    .then((res) => {
      return res.text;
    })
    .catch(
      () =>
        `ChatGPT was unable to find an answer to your question. Please try again later.`
    );

  return res;
};

export default chatgptQuery;
