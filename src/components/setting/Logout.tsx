import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { useI18n } from '@/hook/useI18n';

function Logout() {
  const { t } = useI18n();

  return (
    <a className="setting-icon" onClick={() => signOut({ callbackUrl: '/' })}>
      <ArrowLeftOnRectangleIcon className="h-4 w-4" />
      {t('logout')}
    </a>
  );
}

export default Logout;
