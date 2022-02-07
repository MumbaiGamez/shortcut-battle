import React from 'react';
import { useTranslation } from 'react-i18next';

import { transformDate } from '@utils/date';

import { AuthorTextPropsType } from './types';

import styles from './AuthorText.css';

export const AuthorText = (props: AuthorTextPropsType) => {
  const { author, createdAt, updatedAt } = props;

  const { t } = useTranslation();

  const dateText = updatedAt
    ? t('forum.updated', { date: transformDate(updatedAt) })
    : t('forum.created', { date: transformDate(createdAt) });

  const text = `${dateText}${t('forum.by')} ${author}`;

  return <span className={styles.authorText}>{text}</span>;
};
