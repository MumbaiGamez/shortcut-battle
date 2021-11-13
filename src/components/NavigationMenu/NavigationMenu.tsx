import React from 'react';

import { authAPI } from '../../api/auth';

import { NavigationLink } from '../NavigationLink';

import { RoutesList } from '../../../typings/commonTypes';

import styles from './NavigationMenu.css';

const logout = () => {
  authAPI.logout();
};

const navigationLinks = [
  { link: RoutesList.home, name: 'Home' },
  { link: RoutesList.login, name: 'Login' },
  { link: RoutesList.play, name: 'Play' },
  { link: RoutesList.logout, name: 'Logout', handleClick: logout },
];

export const NavigationMenu = () => {
  return (
    <div className={styles.navigationMenu}>
      {navigationLinks.map(({ handleClick, link, name }) => (
        <NavigationLink
          handleClick={handleClick}
          key={link}
          link={link}
          name={name}
        />
      ))}
    </div>
  );
};
