export type DropdownItemType<T> = {
  name: string;
  value: T;
};

export type DropdownProps<T> = {
  items: DropdownItemType<T>[];
  selectedItem: DropdownItemType<T>;
  setSelectedItem: (item: T) => void;
  round?: boolean;
};
