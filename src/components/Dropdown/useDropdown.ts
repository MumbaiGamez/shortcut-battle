import { useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import { DropdownProps } from './types';

export const useDropdown = <T = string>(props: DropdownProps<T>) => {
  const { items, selectedItem, setSelectedItem } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const filteredItems = items.filter(
    (item) => item.value !== selectedItem.value
  );

  const switchDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const selectItem = (item: T) => {
    setSelectedItem(item);
    switchDropdown();
  };

  useOutsideClick(ref, closeDropdown);

  return { isDropdownOpen, filteredItems, ref, switchDropdown, selectItem };
};
