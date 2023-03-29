'use client';

import { useContext } from 'react';
import { context } from '../i18n/provider';

export function useI18n() {
  const content = useContext(context);
  if (!content) {
    throw new Error('Unable to get instance of i18n');
  }
  return content.i18n;
}
