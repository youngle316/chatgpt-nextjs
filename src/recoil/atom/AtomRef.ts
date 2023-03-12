import { atom } from 'recoil';

const showBottomDivRef = atom({
  key: 'showBottomDivRef',
  default: {},
  dangerouslyAllowMutability: true
});

export { showBottomDivRef };
