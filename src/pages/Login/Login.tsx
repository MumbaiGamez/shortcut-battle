import React, { useState } from 'react';
import classNames from 'classnames';

import { LoginComponent } from './components/LoginComponent';
import { RegistrationComponent } from './components/RegistrationComponent';
import { Star } from '../../components/Star';

import styles from './Login.css';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className={styles.login}>
      {isLogin ? (
        <LoginComponent toggleForm={toggleForm} />
      ) : (
        <RegistrationComponent toggleForm={toggleForm} />
      )}
      <Star
        className={classNames(
          styles.starWrapper,
          isLogin && styles.loginStarPosition
        )}
      />
    </div>
  );
};
