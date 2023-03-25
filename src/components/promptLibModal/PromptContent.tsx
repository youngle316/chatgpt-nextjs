import PromptItem from './PromptItem';

type promptContentProps = {
  content: Prompts;
};

function PromptContent({ content }: promptContentProps) {
  return (
    <div className="flex flex-col gap-3 border-b">
      {content.prompts.map((prompt: Prompt) => {
        return (
          <PromptItem key={prompt.source} prompt={prompt} type={content.type} />
        );
      })}
    </div>
  );
}

export default PromptContent;
