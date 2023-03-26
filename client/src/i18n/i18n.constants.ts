import { FC } from 'react';

import * as english from './en/translation.json';
import french from './fr/translation.json';
import { FRIcon, FlagProps, GBIcon } from './icons';

interface LanguageLabel {
  label: string;
  icon: FC<FlagProps>;
}

interface LanguageRecord {
  [key: string]: LanguageLabel;
}

export const LANGUAGES_LABELS: LanguageRecord = {
  en: {
    label: 'English',
    icon: GBIcon,
  },
  fr: {
    label: 'French',
    icon: FRIcon,
  },
};

export const LANGUAGES = {
  en: {
    translation: english,
  },
  fr: {
    translation: french,
  },
};

export const LANGUAGE_KEY = 'app-language';

export const DEFAULT_LANGUAGE = 'en';
