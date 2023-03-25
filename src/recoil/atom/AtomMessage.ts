import { atom } from 'recoil';

/**
 * This is the state for the parent message id. Track the conversation.
 */
const parentMessageIdState = atom({
  key: 'parentMessageIdState',
  default: ''
});
/**
 * This is the state for the generate message. If true, generating a new message.
 */
const isGenerateState = atom({
  key: 'isGenerateState',
  default: false
});

const chatInputPromptState = atom({
  key: 'chatInputPromptState',
  default: ''
});

const promptLibModalState = atom({
  key: 'promptLibModalState',
  default: false
});

export {
  parentMessageIdState,
  isGenerateState,
  chatInputPromptState,
  promptLibModalState
};
