import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

function Logout() {
  const t = useTranslations('sideBar');

  return (
    <a className="setting-icon" onClick={() => signOut()}>
      <ArrowLeftOnRectangleIcon className="h-4 w-4" />
      {t('logout')}
    </a>
  );
}

export default Logout;
