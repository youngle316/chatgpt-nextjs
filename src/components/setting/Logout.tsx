import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

function Logout() {
  return (
    <a className="setting-icon" onClick={() => signOut()}>
      <ArrowLeftOnRectangleIcon className="h-4 w-4" />
      退出登录
    </a>
  );
}

export default Logout;
