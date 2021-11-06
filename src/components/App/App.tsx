import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import { Home } from '../../pages//Home';
import { ComponentsLibrary } from '../../pages/ComponentsLibrary';

import styles from './App.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/library">Components Library</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<ComponentsLibrary />} />
      </Routes>
    </div>
  );
};
