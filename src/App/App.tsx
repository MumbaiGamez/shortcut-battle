import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ComponentsLibrary } from '../pages/ComponentsLibrary';
import { NavigationMenu } from '../components/NavigationMenu';
import { Leaderboard } from '../pages/Leaderboard';
import { Profile } from '../pages/Profile';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { Game } from '../pages/Game';

import { RoutesList } from '../components/NavigationMenu/useNavigationMenu';

import styles from './App.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <NavigationMenu />
      <Routes>
        <Route path={RoutesList.home} element={<Home />} />
        <Route path={RoutesList.login} element={<Login />} />
        <Route path={RoutesList.library} element={<ComponentsLibrary />} />
        <Route path={RoutesList.play} element={<Game />} />
        <Route path={RoutesList.leaderboard} element={<Leaderboard />} />
        <Route path={RoutesList.profile} element={<Profile />} />
        <Route
          path={RoutesList.logout}
          element={<Navigate to={RoutesList.home} />}
        />
      </Routes>
    </div>
  );
};
