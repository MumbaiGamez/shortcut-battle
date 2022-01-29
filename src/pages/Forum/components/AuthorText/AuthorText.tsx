import React from 'react';

import { transformDate } from '@utils/date';

import { AuthorTextPropsType } from './types';

import styles from './AuthorText.css';

export const AuthorText = (props: AuthorTextPropsType) => {
  const { author, createdAt, updatedAt } = props;

  const dateText = updatedAt
    ? `Updated at ${transformDate(updatedAt)}`
    : `Created at ${transformDate(createdAt)}`;

  const text = `${dateText} by ${author}`;

  return <span className={styles.authorText}>{text}</span>;
};
