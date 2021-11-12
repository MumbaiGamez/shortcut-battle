import React from 'react';
import classNames from 'classnames';
import { useToaster } from './useToaster';

import { ToasterProps } from './types';

import styles from './Toaster.css';

export const Toaster = (props: ToasterProps) => {
  const { toasterId, theme, text } = props;

  const [isHiddenToaster] = useToaster({ toasterId, text });

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
