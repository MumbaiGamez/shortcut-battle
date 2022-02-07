import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { useToaster } from './useToaster';

import styles from './Toaster.css';

export const Toaster = () => {
  const { toasts } = useToaster();
  const { t } = useTranslation();

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
            <span>{t(`messages.${theme}`)}</span>
            <div>{message}</div>
          </div>
        );
      })}
    </div>
  );
};
