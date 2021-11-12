import React from 'react';
import classNames from 'classnames';

import { LoginComponent } from './components/LoginComponent';
import { RegistrationComponent } from './components/RegistrationComponent';
import { Star } from '../../components/Star';
import { Toaster } from '../../components/Toaster';

import { useLogin } from './useLoginPage';

import { ToasterTheme } from '../../components/Toaster/types';

import styles from './Login.css';

export const Login = () => {
  const { error, errorId, handleError, isLogin, toggleForm } = useLogin();

  return (
    <div className={styles.login}>
      <Toaster theme={ToasterTheme.Error} text={error} toasterId={errorId} />
      {isLogin ? (
        <LoginComponent toggleForm={toggleForm} setError={handleError} />
      ) : (
        <RegistrationComponent toggleForm={toggleForm} setError={handleError} />
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
