import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useI18n } from '@/hook/useI18n';

function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const { t } = useI18n();

  return (
    <div onClick={changeTheme} className="setting-icon">
      {theme === 'light' ? (
        <>
          <MoonIcon className="h-4 w-4" />
          {t('darkTheme')}
        </>
      ) : (
        <>
          <SunIcon className="h-4 w-4" />
          {t('lightTheme')}
        </>
      )}
    </div>
  );
}

export default ToggleTheme;
