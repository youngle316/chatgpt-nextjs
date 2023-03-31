import PromptItem from './PromptItem';
import SearchInput from '../searchInput';
import { useState, useEffect } from 'react';
import { useI18n } from '@/hook/useI18n';

type promptContentProps = {
  content: Prompts;
};

function PromptContent({ content }: promptContentProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [showPrompts, setShowPrompts] = useState<Prompt[]>(content.prompts);

  const { t } = useI18n();

  useEffect(() => {
    const newPrompts = content.prompts.filter((prompt: Prompt) => {
      return prompt.title.includes(searchValue);
    });

    setShowPrompts(newPrompts);
  }, [searchValue]);

  return (
    <>
      <div className="mb-4 flex gap-3">
        <div className="flex-1">
          <SearchInput setData={setSearchValue} />
        </div>
        <div className="flex w-10 items-center justify-center text-sm">
          <a
            href={`${
              content.type === 'en'
                ? 'https://github.com/f/awesome-chatgpt-prompts'
                : 'https://github.com/PlexPt/awesome-chatgpt-prompts-zh'
            }`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            {t('promptsSource')}
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-b">
        {showPrompts.map((prompt: Prompt) => {
          return (
            <PromptItem
              key={prompt.source}
              prompt={prompt}
              type={content.type}
            />
          );
        })}
      </div>
    </>
  );
}

export default PromptContent;
