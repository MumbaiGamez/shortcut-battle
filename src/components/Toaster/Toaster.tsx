import React from 'react';
import classNames from 'classnames';

import { useToaster } from './useToaster';

import styles from './Toaster.css';

export const Toaster = () => {
  const { toasts } = useToaster();

  return (
    <div className={styles.toasterContainer}>
      {toasts.map((toast) => {
        const { id, message, theme } = toast;

        return (
          <div
            key={id}
            className={classNames(
              styles.toaster,
              styles[`toasterTheme${theme}`]
            )}
          >
            <span>{theme}</span>
            <div>{message}</div>
          </div>
        );
      })}
    </div>
  );
};
