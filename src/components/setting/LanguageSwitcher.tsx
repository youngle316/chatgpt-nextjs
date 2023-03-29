import { LanguageIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supportedLanguages } from '@/i18n';
import { useI18n } from '@/hook/useI18n';

const reg = new RegExp(supportedLanguages.map((x) => `/${x}`).join('|'));

function LanguageSwitcher() {
  const pathname = usePathname();
  const { t, locale } = useI18n();

  const prefix = locale() === 'en' ? '/zh' : '/en';
  const href = `${prefix}/${pathname?.replace(reg, '') || '/'}`;

  return (
    <Link className="setting-icon" href={href}>
      <LanguageIcon className="h-4 w-4" />
      {t('language')}
    </Link>
  );
}

export default LanguageSwitcher;
