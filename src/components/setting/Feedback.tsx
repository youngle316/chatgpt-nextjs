import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

function Feedback() {
  const t = useTranslations('sideBar');

  return (
    <a
      className="setting-icon"
      href="https://github.com/youngle316/chatgpt/issues"
      target="_blank"
      rel="noreferrer"
    >
      <EnvelopeIcon className="h-4 w-4" />
      {t('feedback')}
    </a>
  );
}

export default Feedback;
