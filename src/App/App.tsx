import React, { StrictMode } from 'react';
import { hot } from 'react-hot-loader/root';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ComponentsLibrary } from '@pages/ComponentsLibrary';
import { Leaderboard } from '@pages/Leaderboard';
import { Profile } from '@pages/Profile';
import { Forum } from '@pages/Forum';
import { Login } from '@pages/Login';
import { Home } from '@pages/Home';
import { Game } from '@pages/Game';

import { ErrorBoundary } from '@components/ErrorBoundary';
import { NavigationMenu } from '@components/NavigationMenu';
import { PrivateRoute } from '@components/PrivateRoute';
import { Toaster } from '@components/Toaster';
import { RoutesList } from '@components/NavigationMenu/useNavigationMenu';

import { useAuth } from './useAuth';

import styles from './App.css';

const _App = () => {
  useAuth();

  return (
    <StrictMode>
      <ErrorBoundary>
        <div className={styles.app}>
          <NavigationMenu />
          <Routes>
            <Route path={RoutesList.home} element={<Home />} />
            <Route path={RoutesList.play} element={<Game />} />
            <Route path={RoutesList.login} element={<Login />} />
            <Route path={RoutesList.library} element={<ComponentsLibrary />} />
            <Route
              path={RoutesList.leaderboard}
              element={<PrivateRoute element={<Leaderboard />} />}
            />
            <Route
              path={RoutesList.profile}
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route
              path={RoutesList.logout}
              element={
                <PrivateRoute element={<Navigate to={RoutesList.home} />} />
              }
            />
            <Route path={RoutesList.forum} element={<Forum />} />
          </Routes>
          <Toaster />
        </div>
      </ErrorBoundary>
    </StrictMode>
  );
};

export const App = hot(_App);
