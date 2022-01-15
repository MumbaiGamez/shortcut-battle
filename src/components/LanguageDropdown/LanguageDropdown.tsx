import React from 'react';

import { Dropdown } from '../Dropdown';

import { useLanguageDropdown } from './useLanguageDropdown';

export const LanguageDropdown = () => {
  const { items, selectedItem, setSelectedItem } = useLanguageDropdown();

  return (
    <Dropdown
      items={items}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />
  );
};
