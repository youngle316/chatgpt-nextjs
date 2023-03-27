import TwitterSvg from 'public/assets/twitter.svg';
import GitHubSvg from 'public/assets/github.svg';
import { useTranslations } from 'next-intl';

function Footer() {
  const t = useTranslations('footer');

  return (
    <>
      <div>
        {t('apiFrom')} &nbsp;
        <a
          className="underline"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/transitive-bullshit/chatgpt-api"
        >
          chatgpt-api
        </a>
      </div>
      <a target="_blank" rel="noreferrer" href="https://twitter.com/youngle316">
        <TwitterSvg className="h-4 w-4" />
      </a>
      <a target="_blank" rel="noreferrer" href="https://github.com/youngle316">
        <GitHubSvg className="h-4 w-4" />
      </a>
    </>
  );
}

export default Footer;
