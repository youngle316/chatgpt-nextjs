import { translator } from './deeplModel';

const deepLTranslate = async (prompt: string) => {
  const res = await translator
    .translateText(prompt, null, 'en-US')
    .then((res) => {
      return res;
    })
    .catch();

  return res;
};

export default deepLTranslate;
