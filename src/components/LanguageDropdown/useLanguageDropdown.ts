import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  selectActiveLanguage,
  selectLanguages,
} from '@redux/slices/settingsSlice';

export const useLanguageDropdown = () => {
  const items = useSelector(selectLanguages);
  const selectedLanguage = useSelector(selectActiveLanguage);

  const [selectedItem, setSelectedItem] = useState(selectedLanguage);

  return { items, selectedItem, setSelectedItem };
};
