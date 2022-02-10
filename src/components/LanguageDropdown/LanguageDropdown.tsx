import React from 'react';

import { Dropdown } from '../Dropdown';

import { useLanguageDropdown } from './useLanguageDropdown';

export const LanguageDropdown = () => {
  const { items, selectedItem, setLanguage } = useLanguageDropdown();

  return (
    <Dropdown
      items={items}
      selectedItem={selectedItem}
      setSelectedItem={setLanguage}
      round
    />
  );
};
