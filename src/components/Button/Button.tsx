import React from 'react';
import classNames from 'classnames';

import { ButtonProps, ButtonTheme } from './types';

import styles from './Button.css';

export const Button = ({
  children,
  className,
  isDisabled,
  theme,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        theme === ButtonTheme.Glow && styles.buttonThemeGlow,
        isDisabled && styles.buttonDisabled,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
