import { BanknotesIcon } from '@heroicons/react/24/outline';

function ChangeLog() {
  return (
    <a
      className="setting-icon"
      href="https://github.com/youngle316/chatgpt/releases"
      target="_blank"
      rel="noreferrer"
    >
      <BanknotesIcon className="h-4 w-4" />
      版本日志
    </a>
  );
}

export default ChangeLog;
