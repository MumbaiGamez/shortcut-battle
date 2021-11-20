import { useState } from 'react';

import { AvatarProps } from './types';

export const useAvatar = (props: AvatarProps) => {
  const { name, src } = props;
  const [image, setImage] = useState(src);

  const handleImageChange = (newImage: string) => {
    setImage(newImage);
  };

  const handleDeleteImage = () => {
    setImage('');
  };

  const initials = name?.[0]?.toUpperCase();

  return { handleDeleteImage, handleImageChange, image, initials };
};
