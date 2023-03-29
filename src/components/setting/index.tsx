import Logout from './Logout';
import ChangeLog from './ChangeLog';
import Feedback from './Feedback';
import LanguageSwitcher from './LanguageSwitcher';
import ToggleTheme from './ToggleTheme';

function Setting() {
  return (
    <>
      <LanguageSwitcher />
      <ToggleTheme />
      <Feedback />
      <ChangeLog />
      <Logout />
    </>
  );
}

export default Setting;
