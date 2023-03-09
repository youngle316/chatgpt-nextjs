import { atom } from 'recoil';

const openState = atom({
  key: 'openState',
  default: false
});

export { openState };
