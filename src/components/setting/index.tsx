import Logout from './Logout';
import ChangeLog from './ChangeLog';
import Feedback from './Feedback';
import LanguageSwitcher from './LanguageSwitcher';

function Setting() {
  return (
    <>
      <LanguageSwitcher />
      <Feedback />
      <ChangeLog />
      <Logout />
    </>
  );
}

export default Setting;
