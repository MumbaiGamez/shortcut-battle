import React from 'react';
import classNames from 'classnames';

import { ButtonProps, ButtonTheme } from './types';

import styles from './Button.css';

export const Button = (props: ButtonProps) => {
  const { children, className, isDisabled, theme, ...restProps } = props;
  return (
    <button
      className={classNames(
        styles.button,
        theme === ButtonTheme.Glow && styles.buttonThemeGlow,
        isDisabled && styles.buttonDisabled,
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
