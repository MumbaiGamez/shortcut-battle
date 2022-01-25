import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import fetch from 'isomorphic-fetch';

import { ApiMethods } from '@redux/types/apiTypes';

export const useLanguageDropdown = () => {
  const { i18n } = useTranslation();

  const items = useMemo(() => {
    return SUPPORTED_LANGUAGES.map((item) => {
      return {
        name: item.toUpperCase(),
        value: item,
      };
    });
  }, []);

  const selectedItem = {
    name: i18n.language.toUpperCase(),
    value: i18n.language,
  };

  const setLanguage = (language: string) => {
    i18n.changeLanguage(language);

    fetch(`${location.protocol}//${location.host}/users/settings`, {
      method: ApiMethods.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          lang: language,
        },
      }),
    });
  };

  return { items, selectedItem, setLanguage };
};
