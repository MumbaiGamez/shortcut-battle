import { useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import { DropdownProps } from './types';

export const useDropdown = (props: DropdownProps) => {
  const { items, selectedItem, setSelectedItem } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const filteredItems = items.filter(
    (item) => item.value !== selectedItem.value
  );

  const switchDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const selectItem = (item: string) => {
    setSelectedItem(item);
    switchDropdown();
  };

  useOutsideClick(ref, switchDropdown);

  return { isDropdownOpen, filteredItems, ref, switchDropdown, selectItem };
};
