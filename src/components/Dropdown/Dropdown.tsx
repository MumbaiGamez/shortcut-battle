import React from 'react';
import classNames from 'classnames';

import { useDropdown } from './useDropdown';

import { DropdownProps } from './types';

import styles from './Dropdown.css';

export const Dropdown = function <T = string>(props: DropdownProps<T>) {
  const { selectedItem, round } = props;

  const { isDropdownOpen, filteredItems, ref, switchDropdown, selectItem } =
    useDropdown<T>(props);

  return (
    <div
      className={classNames(styles.dropdownContainer, round && styles.round)}
      ref={ref}
    >
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
