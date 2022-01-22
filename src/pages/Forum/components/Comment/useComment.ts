import { useState } from 'react';

import { useSelector } from 'react-redux';

import { selectIsAuth } from '@redux/slices/settingsSlice';
import { useAddCommentMutation } from '@redux/api/forumApi';

export const useComment = () => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [addComment, { isLoading }] = useAddCommentMutation();

  const isAuth = useSelector(selectIsAuth);

  const toggleInput = () => {
    setIsShowInput((prevState) => !prevState);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const sendComment = () => {
    if (inputValue) {
      addComment(inputValue);
      handleInputChange('');
      toggleInput();
    }
  };

  return {
    isAuth,
    isLoading,
    isShowInput,
    inputValue,
    handleInputChange,
    sendComment,
    toggleInput,
  };
};
