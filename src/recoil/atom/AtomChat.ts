import { atom } from 'recoil';

const isChatEditState = atom({
  key: 'isChatEdit',
  default: false
});

const oldChatIdState = atom({
  key: 'oldChatIdState',
  default: ''
});

const currentChatIdState = atom({
  key: 'currentChatIdState',
  default: ''
});

export { isChatEditState, oldChatIdState, currentChatIdState };
