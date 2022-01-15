import { useEffect, useRef, useState } from 'react';

import { DropdownProps } from './types';

export const useDropdown = (props: DropdownProps) => {
  const { items, selectedItem, setSelectedItem } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const filteredItems = items.filter((item) => item.name !== selectedItem);

  const switchDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const selectItem = (item: string) => {
    setSelectedItem(item);
    switchDropdown();
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      if (
        isDropdownOpen &&
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

  return { isDropdownOpen, filteredItems, ref, switchDropdown, selectItem };
};
