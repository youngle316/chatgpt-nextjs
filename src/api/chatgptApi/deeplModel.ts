import * as deepl from 'deepl-node';

const authKey = process.env.DEEPL_TRANSLATE_KEY as string;

const translator = new deepl.Translator(authKey);

export { translator };
