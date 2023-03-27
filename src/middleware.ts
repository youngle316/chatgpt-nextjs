import { createIntlMiddleware } from 'next-intl/server';

export default createIntlMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'zh'
});
