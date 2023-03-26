import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE, LANGUAGES } from './i18n.constants';

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init({
  resources: LANGUAGES,
  debug: false,
  fallbackLng: DEFAULT_LANGUAGE,
});

export default i18next;
