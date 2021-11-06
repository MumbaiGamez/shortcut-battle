import React from 'react';
import classNames from 'classnames';

import { Card } from '../Card';

import { useToaster } from './useToaster';

import { ToasterProps } from './types';

import styles from './Toaster.css';

export const Toaster = (props: ToasterProps) => {
  const { isSuccess, isError, text } = props;

  const [isHideToaster] = useToaster({ isSuccess, isError, text });
  return (
    <div
      className={classNames(
        styles.toaster,
        isError && styles.error,
        isSuccess && styles.success,
        isHideToaster && styles.hide
      )}
    >
      <Card>
        <h2>{(isError && 'Error') || (isSuccess && 'Success')}</h2>
        <div>{text}</div>
      </Card>
    </div>
  );
};
