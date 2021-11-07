import React from 'react';
import classNames from 'classnames';

import { ButtonProps } from './types';

import styles from './Button.css';

export const Button = ({
  children,
  className,
  isGlow,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        isGlow && styles.buttonThemeGlow,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
