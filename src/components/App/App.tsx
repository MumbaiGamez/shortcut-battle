import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from '../../pages//Home';
import { ComponentsLibrary } from '../../pages/ComponentsLibrary';

import { NavigationMenu } from '../NavigationMenu';

import styles from './App.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<ComponentsLibrary />} />
      </Routes>
    </div>
  );
};
