import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { NavigationLinkProps } from './types';

import styles from './NavigationLink.css';

export const NavigationLink = (props: NavigationLinkProps) => {
  const { link, name, handleClick } = props;

  return (
    <NavLink
      className={({ isActive }) =>
        classNames(styles.link, isActive && styles.activeLink)
      }
      to={link}
      onClick={handleClick}
    >
      <span className={styles.mainText}>{name}</span>
      <button className={styles.hoveredText}>{name}</button>
    </NavLink>
  );
};
