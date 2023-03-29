import { BanknotesIcon } from '@heroicons/react/24/outline';
import { useI18n } from '@/hook/useI18n';

function ChangeLog() {
  const { t } = useI18n();

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
