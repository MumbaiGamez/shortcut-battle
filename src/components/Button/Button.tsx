import React from 'react';
import classNames from 'classnames';

import { ButtonProps, ButtonTheme } from './types';

import styles from './Button.css';

export const Button = ({
  children,
  className,
  theme = ButtonTheme.Default,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[`buttonTheme${theme}`],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
