import { atom } from 'recoil';

/**
 * This is the state for the parent message id. Track the conversation.
 */
const parentMessageIdState = atom({
  key: 'parentMessageIdState',
  default: ''
});

export { parentMessageIdState };
