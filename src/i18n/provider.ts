'use client';

import {
  createContext,
  createElement,
  ReactNode,
  useMemo,
  useState
} from 'react';
import { NextI18n } from './next-i18n';

export const context = createContext<{ i18n: NextI18n } | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  i18n: NextI18n;
}

export function I18nProvider({ i18n, children }: I18nProviderProps) {
  const [, setTick] = useState(0);

  const value = useMemo(() => {
    i18n.setOnChange(() => {
      setTick((s) => s + 1);
    });
    return { i18n };
  }, [i18n]);

  return createElement(context.Provider, {
    value: { ...value },
    children
  });
}
