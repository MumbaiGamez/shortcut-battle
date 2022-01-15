export type DropdownItemType = {
  name: string;
  value: string;
};

export type DropdownProps = {
  items: DropdownItemType[];
  selectedItem: DropdownItemType;
  setSelectedItem: (item: string) => void;
};
