import { Dispatch } from 'react';

export type DropdownItemType = {
  name: string;
};

export type DropdownProps = {
  items: DropdownItemType[];
  selectedItem: string;
  setSelectedItem: Dispatch<React.SetStateAction<string>>;
};
