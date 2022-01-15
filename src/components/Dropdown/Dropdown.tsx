import React from 'react';

import classNames from 'classnames';

import { DropdownProps } from './types';

import styles from './Dropdown.css';
import { useDropdown } from './useDropdown';

export const Dropdown = (props: DropdownProps) => {
  const { selectedItem } = props;

  const { isDropdownOpen, filteredItems, ref, switchDropdown, selectItem } =
    useDropdown(props);

  return (
    <div className={styles.dropdownContainer} ref={ref}>
      <div className={styles.selectedItem} onClick={switchDropdown}>
        {selectedItem.name}
      </div>
      <ul
        className={classNames(
          styles.listContainer,
          isDropdownOpen && styles.showList
        )}
      >
        {filteredItems.map((item) => {
          return (
            <li
              className={styles.listItem}
              key={item.name}
              onClick={() => selectItem(item.value)}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
