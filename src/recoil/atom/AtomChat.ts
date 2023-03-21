import { atom } from 'recoil';

const isChatEditState = atom({
  key: 'isChatEdit',
  default: false
});

const oldChatIdState = atom({
  key: 'oldChatIdState',
  default: ''
});

export { isChatEditState, oldChatIdState };
