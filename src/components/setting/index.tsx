import Logout from './Logout';
import ChangeLog from './ChangeLog';
import Feedback from './Feedback';
import LocaleSwitcher from './LocaleSwitcher';

function Setting() {
  return (
    <>
      <LocaleSwitcher />
      <Feedback />
      <ChangeLog />
      <Logout />
    </>
  );
}

export default Setting;
