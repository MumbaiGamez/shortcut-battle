import React from 'react';

import { Input, InputTypeEnum } from '../Input';

import { AvatarProps } from './types';

import styles from './Avatar.css';

export const Avatar = (props: AvatarProps) => {
  const { handleChangeAvatar, handleDeleteAvatar, name, src } = props;

  const initials = name?.[0]?.toUpperCase();

  return (
    <div className={styles.avatar}>
      <Input
        className={styles.input}
        type={InputTypeEnum.file}
        hanldeChange={handleChangeAvatar}
      />
      {src && (
        <>
          <img src={src} alt={name} className={styles.image} />
          <div className={styles.delete} onClick={handleDeleteAvatar} />
        </>
      )}
      <span className={styles.initials}>{initials}</span>
    </div>
  );
};
