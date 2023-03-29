'use client';

import { I18nProvider, i18n } from '@/i18n';
import { useEffect } from 'react';

export function I18nClientProvider({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: string;
}) {
  useEffect(() => {
    if (i18n.locale() !== locale) {
      i18n.locale(locale);
    }
  }, [locale]);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
