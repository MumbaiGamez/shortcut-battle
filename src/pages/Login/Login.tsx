import React from 'react';
import classNames from 'classnames';

import { LoginComponent } from './components/LoginComponent';
import { RegistrationComponent } from './components/RegistrationComponent';
import { Star } from '../../components/Start';
import { Toaster } from '../../components/Toaster';

import { useLogin } from './useLogin';

import styles from './Login.css';

export const Login = () => {
  const { error, errorId, handleError, isLogin, switchForm } = useLogin();

  return (
    <div className={styles.login}>
      <Toaster isError={!!error} text={error} errorId={errorId} />
      {isLogin ? (
        <LoginComponent switchForm={switchForm} setError={handleError} />
      ) : (
        <RegistrationComponent switchForm={switchForm} setError={handleError} />
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
