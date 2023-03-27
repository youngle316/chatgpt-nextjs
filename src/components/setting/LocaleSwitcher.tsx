import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { LanguageIcon } from '@heroicons/react/24/outline';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const otherLocale = locale === 'en' ? 'zh' : 'en';

  return (
    <Link className="setting-icon" href={'/' + otherLocale} prefetch={false}>
      <LanguageIcon className="h-4 w-4" />
      {t('switchLocale', { locale: otherLocale })}
    </Link>
  );
}
