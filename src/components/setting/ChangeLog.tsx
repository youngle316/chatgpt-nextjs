import { BanknotesIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

function ChangeLog() {
  const t = useTranslations('sideBar');

  return (
    <a
      className="setting-icon"
      href="https://github.com/youngle316/chatgpt/releases"
      target="_blank"
      rel="noreferrer"
    >
      <BanknotesIcon className="h-4 w-4" />
      {t('versionInfo')}
    </a>
  );
}

export default ChangeLog;
