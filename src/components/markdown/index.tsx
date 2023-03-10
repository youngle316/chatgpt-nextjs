import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeKatex from 'rehype-katex';

type ConvertToMarkdownProps = {
  content: string;
};

function ConvertToMarkdown({ content }: ConvertToMarkdownProps) {
  return (
    <ReactMarkdown
      children={content}
      components={{
        code({ node, inline, className, style, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={oneDark}
              language={match ? match[1] : ''}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className="font-semibold italic" {...props}>
              {children}
            </code>
          );
        }
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeKatex]}
    />
  );
}

export default ConvertToMarkdown;
