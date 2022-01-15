import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguageDropdown = () => {
  const { i18n } = useTranslation();

  const items = useMemo(() => {
    return i18n.languages.map((item) => {
      return {
        name: item.toUpperCase(),
        value: item,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedItem = {
    name: i18n.language.toUpperCase(),
    value: i18n.language,
  };

  const setLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return { items, selectedItem, setLanguage };
};
