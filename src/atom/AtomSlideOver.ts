import { atom } from 'recoil';

const openState = atom({
  key: 'openState',
  default: true
});

export { openState };
