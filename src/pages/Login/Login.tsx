import React from 'react';
import classNames from 'classnames';

import { LoginComponent } from './components/LoginComponent';
import { RegistrationComponent } from './components/RegistrationComponent';
import { Star } from '../../components/Start';

import styles from './Login.css';

export const Login = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const switchForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className={styles.login}>
      {isLogin ? (
        <LoginComponent switchForm={switchForm} />
      ) : (
        <RegistrationComponent switchForm={switchForm} />
      )}
      <Star
        customClassName={classNames(
          styles.starWrapper,
          isLogin && styles.loginStarPosition
        )}
      />
    </div>
  );
};
