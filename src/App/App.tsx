import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { ComponentsLibrary } from '../pages/ComponentsLibrary';
import { NavigationMenu } from '../components/NavigationMenu';

import styles from './App.css';
import { RoutesList } from '../../typings/commonTypes';

export const App = () => {
  return (
    <div className={styles.app}>
      <NavigationMenu />
      <Routes>
        <Route path={RoutesList.home} element={<Home />} />
        <Route path={RoutesList.library} element={<ComponentsLibrary />} />
      </Routes>
    </div>
  );
};
