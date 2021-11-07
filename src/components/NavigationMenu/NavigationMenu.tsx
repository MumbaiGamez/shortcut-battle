import React from 'react';

import { NavigationLink } from '../NavigationLink';

import { RoutesList } from '../../../typings/commonTypes';

import styles from './NavigationMenu.css';

const navigationConfig = [
  { link: RoutesList.home, name: 'Home' },
  { link: RoutesList.login, name: 'Login' },
  { link: RoutesList.library, name: 'Library' },
  { link: RoutesList.play, name: 'Play' },
];

export const NavigationMenu = () => {
  return (
    <div className={styles.navigationMenu}>
      {navigationConfig.map(({ link, name }) => (
        <NavigationLink link={link} name={name} key={link} />
      ))}
    </div>
  );
};
