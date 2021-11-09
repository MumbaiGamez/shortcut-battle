import React from 'react';
import classNames from 'classnames';

import { LoginComponent } from './components/LoginComponent';
import { RegistrationComponent } from './components/RegistrationComponent';
import { Star } from '../../components/Start';
import { Toaster } from '../../components/Toaster';

import styles from './Login.css';

export const Login = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const switchForm = () => {
    setIsLogin((prev) => !prev);
  };
  const [error, setError] = React.useState('');

  return (
    <div className={styles.login}>
      <Toaster isError={!!error} text={error} />
      {isLogin ? (
        <LoginComponent switchForm={switchForm} setError={setError} />
      ) : (
        <RegistrationComponent switchForm={switchForm} setError={setError} />
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
