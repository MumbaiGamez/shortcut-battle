import React from 'react';
import classNames from 'classnames';

import { ButtonProps } from './types';

import styles from './Button.css';

export const Button = (props: ButtonProps) => {
  const { children, className, isActive, isDisabled, theme, ...restProps } =
    props;

  return (
    <button
      className={classNames(
        styles.button,
        styles[`buttonTheme${theme}`],
        isDisabled && styles.buttonDisabled,
        isActive && styles.buttonActive,
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
