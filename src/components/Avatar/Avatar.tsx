import React from 'react';

import { FilePicker } from '../FilePicker';

import { AvatarProps } from './types';

import styles from './Avatar.css';

export const Avatar = (props: AvatarProps) => {
  const {
    handleChangeAvatar,
    handleDeleteAvatar,
    name,
    src,
    size = 100,
  } = props;

  const initials = name?.[0]?.toUpperCase();

  return (
    <div className={styles.avatar} style={{ minWidth: size, height: size }}>
      {handleChangeAvatar && (
        <FilePicker
          containerClassName={styles.input}
          handleChange={handleChangeAvatar}
        />
      )}
      {src && (
        <>
          <img src={src} alt={name} className={styles.image} />
          <div className={styles.delete} onClick={handleDeleteAvatar} />
        </>
      )}
      {initials && (
        <span className={styles.initials} style={{ fontSize: size / 2 }}>
          {initials}
        </span>
      )}
    </div>
  );
};
