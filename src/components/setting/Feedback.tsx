import { EnvelopeIcon } from '@heroicons/react/24/outline';

function Feedback() {
  return (
    <a
      className="setting-icon"
      href="https://github.com/youngle316/chatgpt/issues"
      target="_blank"
      rel="noreferrer"
    >
      <EnvelopeIcon className="h-4 w-4" />
      问题反馈
    </a>
  );
}

export default Feedback;
