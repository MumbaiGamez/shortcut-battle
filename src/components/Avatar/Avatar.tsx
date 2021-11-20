import React from 'react';

import { Input, InputTypeEnum } from '../Input';

import { useAvatar } from './useAvatar';

import { AvatarProps } from './types';

import styles from './Avatar.css';

export const Avatar = (props: AvatarProps) => {
  const { name } = props;

  const { handleDeleteImage, handleImageChange, image, initials } =
    useAvatar(props);

  return (
    <div className={styles.avatar}>
      <Input
        className={styles.input}
        type={InputTypeEnum.file}
        hanldeChange={handleImageChange}
      />
      {image && (
        <>
          <img src={image} alt={name} className={styles.image} />
          <div className={styles.delete} onClick={handleDeleteImage} />
        </>
      )}
      <span className={styles.initials}>{initials}</span>
    </div>
  );
};
