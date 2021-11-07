import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ComponentsLibrary } from '../pages/ComponentsLibrary';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Game } from '../pages/Game';
import { NavigationMenu } from '../components/NavigationMenu';

import { RoutesList } from '../../typings/commonTypes';

import styles from './App.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <NavigationMenu />
      <Routes>
        <Route path={RoutesList.home} element={<Home />} />
        <Route path={RoutesList.login} element={<Login />} />
        <Route path={RoutesList.play} element={<Game />} />
        <Route path={RoutesList.library} element={<ComponentsLibrary />} />
      </Routes>
    </div>
  );
};
