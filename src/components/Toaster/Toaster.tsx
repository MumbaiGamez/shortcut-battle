import React from 'react';
import classNames from 'classnames';

import { useToaster } from './useToaster';

import styles from './Toaster.css';

export const Toaster = () => {
  const { isHiddenToaster, theme, text } = useToaster();

  return (
    <div
      className={classNames(
        styles.toaster,
        styles[`toasterTheme${theme}`],
        isHiddenToaster && styles.hide
      )}
    >
      <span>{theme}</span>
      <div>{text}</div>
    </div>
  );
};
