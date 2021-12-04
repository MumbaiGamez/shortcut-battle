import React from 'react';
import classNames from 'classnames';

import { LoginComponent } from './components/LoginComponent';
import { RegistrationComponent } from './components/RegistrationComponent';
import { Star } from '../../components/Star';

import { useLoginPage } from './useLoginPage';

import styles from './Login.css';

export const Login = () => {
  const { isLogin, toggleForm } = useLoginPage();

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
