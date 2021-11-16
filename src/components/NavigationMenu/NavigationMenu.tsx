import React from 'react';
import classNames from 'classnames';

import { NavigationLink } from '../NavigationLink';
import { Button, ButtonTheme } from '../Button';

import { useNavigationMenu } from './useNavigationMenu';

import styles from './NavigationMenu.css';

export const NavigationMenu = () => {
  const { isMenuOpen, navigationLinks, toggleMenu } = useNavigationMenu();

  return (
    <>
      <div className={styles.buttonWrapper}>
        <Button
          isActive={isMenuOpen}
          onClick={toggleMenu}
          theme={ButtonTheme.Menu}
        />
      </div>
      <div
        className={classNames(
          styles.navigationMenu,
          isMenuOpen && styles.showMenu
        )}
      >
        {navigationLinks.map(({ handleClick, link, name }) => (
          <NavigationLink
            handleClick={handleClick}
            key={link}
            link={link}
            name={name}
          />
        ))}
      </div>
    </>
  );
};
