import React, { FC, ReactElement, useEffect } from 'react';

import { useLocalStorage } from '@astrosat/react-utils';
import { useTranslation } from 'react-i18next';

import { DEFAULT_LANGUAGE, LANGUAGES_LABELS, LANGUAGE_KEY } from './i18n.constants';
import { FRIcon, FlagProps, GBIcon } from './icons';

interface Props {
  className?: string;
}

export const LanguageSwitcher: FC<Props> = ({ className }): ReactElement => {
  const [language, setLanguage] = useLocalStorage(LANGUAGE_KEY, DEFAULT_LANGUAGE);

  const Icon: FC<FlagProps> = LANGUAGES_LABELS[language].icon;

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const updateLanguage = (lang: string) => {
    setLanguage(lang);
    // Close dropdown after selection.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className={`dropdown-end dropdown w-32 ${className}`}>
      <label className="btn-primary btn m-1 w-32 hover:bg-accent hover:text-accent" tabIndex={0}>
        <Icon className="mr-2 w-4" />
        <p>{LANGUAGES_LABELS[language].label}</p>
      </label>
      <ul className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-gray-500 shadow" tabIndex={0}>
        <li onClick={() => updateLanguage('en')}>
          <span>
            <GBIcon className="w-8" />
            <p>English</p>
          </span>
        </li>
        <li onClick={() => updateLanguage('fr')}>
          <span>
            <FRIcon className="w-8" />
            <p>French</p>
          </span>
        </li>
      </ul>
    </div>
  );
};
