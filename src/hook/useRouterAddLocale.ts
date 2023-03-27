import { useLocale } from 'next-intl';

const useRouterAddLocale = () => {
  const locale = useLocale();
  const localePath = `/${locale}`;
  return localePath;
};

export default useRouterAddLocale;
