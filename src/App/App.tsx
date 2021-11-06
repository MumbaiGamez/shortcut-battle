import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ComponentsLibrary } from '../pages/ComponentsLibrary';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { NavigationMenu } from '../components/NavigationMenu';

import styles from './App.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/library" element={<ComponentsLibrary />} />
      </Routes>
    </div>
  );
};
