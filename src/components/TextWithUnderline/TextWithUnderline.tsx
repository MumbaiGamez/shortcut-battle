import React from 'react';

import classNames from 'classnames';

import { TextWithUnderlinePropsType } from './types';

import styles from './TextWithUnderline.css';

export const TextWithUnderline = (props: TextWithUnderlinePropsType) => {
  const { className, onClick, text } = props;
  return (
    <span
      className={classNames(styles.textWithUnderline, className)}
      onClick={onClick}
    >
      {text}
    </span>
  );
};
