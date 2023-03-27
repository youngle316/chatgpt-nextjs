import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';
import { chatInputPromptState } from '@/recoil/atom/AtomMessage';
import { useRecoilState } from 'recoil';
import { promptLibModalState } from '@/recoil/atom/AtomMessage';
import textAreaAutoHeight from '@/utils/textAreaAutoHeight';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

type PromptItemProps = {
  prompt: Prompt;
  type: Prompts['type'];
};

function PromptItem({ prompt, type }: PromptItemProps) {
  const [chatInputPrompt, setChatInputPrompt] =
    useRecoilState(chatInputPromptState);
  const [, setPromptLibModalState] = useRecoilState(promptLibModalState);

  const t = useTranslations('prompt');

  const usePromptLib = () => {
    setChatInputPrompt(prompt.content);
    setPromptLibModalState(false);
  };

  useEffect(() => {
    textAreaAutoHeight('chatTextArea');
  }, [chatInputPrompt]);

  return (
    <div className="mb-4 flex items-center justify-between gap-3 space-x-2 rounded border border-gray-200 bg-white/80 p-4 shadow-sm dark:border-gray-600 dark:bg-black">
      <div className="flex flex-1 items-center font-bold text-gray-800 dark:text-white">
        {prompt.title}
      </div>
      <div className={`${type === 'en' ? 'w-20' : 'w-30'}`}>
        <button onClick={usePromptLib} className="blue-button">
          {t('usePrompt')}
          <ArrowSmallRightIcon className="ml-2 -mr-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default PromptItem;
