import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

function Description() {
  const t = useTranslations('message');

  return (
    <>
      <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:h-full md:max-w-2xl md:flex-col lg:max-w-3xl">
        <h1 className="mt-6 ml-auto mr-auto mb-10 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mt-[20vh] sm:mb-16">
          {t('chatgpt')}
        </h1>
        <div className="items-start gap-3.5 text-center md:flex">
          {/* Examples */}
          <div className="main-item">
            <h2 className="main-item-title">
              <SunIcon className="h-6 w-6" />
              {t('example')}
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="main-item-content">{t('exampleOne')}</li>
              <li className="main-item-content">{t('exampleTwo')}</li>
              <li className="main-item-content">{t('exampleThree')}</li>
            </ul>
          </div>
          {/* Capabilities */}
          <div className="main-item">
            <h2 className="main-item-title">
              <BoltIcon className="h-6 w-6" />
              {t('capabilities')}
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="main-item-content">{t('capabilitiesOne')}</li>
              <li className="main-item-content">{t('capabilitiesTwo')}</li>
              <li className="main-item-content">{t('capabilitiesThree')}</li>
            </ul>
          </div>
          {/* Limitations */}
          <div className="main-item">
            <h2 className="main-item-title">
              <ExclamationTriangleIcon className="h-6 w-6" />
              {t('suggestion')}
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="main-item-content">{t('suggestionOne')}</li>
              <li className="main-item-content">{t('suggestionTwo')}</li>
              <li className="main-item-content">{t('suggestionThree')}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Description;
