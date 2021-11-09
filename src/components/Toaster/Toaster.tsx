import React from 'react';
import classNames from 'classnames';
import { useToaster } from './useToaster';

import { ToasterProps } from './types';

import styles from './Toaster.css';

export const Toaster = (props: ToasterProps) => {
  const { errorId, isSuccess, isError, text } = props;

  const [isHideToaster] = useToaster({ errorId, isSuccess, isError, text });
  return (
    <div
      className={classNames(
        styles.toaster,
        isError && styles.error,
        isSuccess && styles.success,
        isHideToaster && styles.hide
      )}
    >
      <span>{(isError && 'Error') || (isSuccess && 'Success')}</span>
      <div>{text}</div>
    </div>
  );
};
