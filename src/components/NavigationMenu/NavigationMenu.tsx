import React from 'react';

import { NavigationLink } from '../NavigationLink';

import { Routs } from '../../../typings/commonTypes';

import styles from './NavigationMenu.css';

export const NavigationMenu = () => {
  return (
    <div className={styles.container}>
      <NavigationLink link={Routs.home} name={'Home'} />
      <NavigationLink link={Routs.library} name={'Library'} />
      <NavigationLink link={Routs.login} name={'Login'} />
    </div>
  );
};
