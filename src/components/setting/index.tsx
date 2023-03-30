import Logout from './Logout';
import ChangeLog from './ChangeLog';
import Feedback from './Feedback';
import LanguageSwitcher from './LanguageSwitcher';
import ToggleTheme from './ToggleTheme';
import useIsMobile from '@/hook/useIsMobile';

function Setting() {
  const isMobile = useIsMobile();

  return (
    <>
      <LanguageSwitcher />
      {!isMobile && <ToggleTheme />}
      <Feedback />
      <ChangeLog />
      <Logout />
    </>
  );
}

export default Setting;
