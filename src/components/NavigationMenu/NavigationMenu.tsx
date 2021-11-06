import React from 'react';

import { NavigationLink } from '../NavigationLink';

import { Routs } from '../../../typings/commonTypes';

import styles from './NavigationMenu.css';

const navigationConfig = [
  { link: Routs.home, name: 'Home' },
  { link: Routs.login, name: 'Login' },
  { link: Routs.library, name: 'Library' },
];

export const NavigationMenu = () => {
  return (
    <div className={styles.container}>
      {navigationConfig.map(({ link, name }) => (
        <NavigationLink link={link} name={name} key={link} />
      ))}
    </div>
  );
};
