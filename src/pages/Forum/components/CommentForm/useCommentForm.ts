import { useState } from 'react';

import { CommentFormPropsType } from './types';

export const useCommentForm = (props: CommentFormPropsType) => {
  const { parentCommentId, postId, sendCallback } = props;

  const [isShowInput, setIsShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleInput = () => {
    setIsShowInput((prevState) => !prevState);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const sendComment = () => {
    if (inputValue) {
      sendCallback({ text: inputValue, postId, parentCommentId });
      handleInputChange('');
      toggleInput();
    }
  };

  return {
    isShowInput,
    inputValue,
    handleInputChange,
    sendComment,
    toggleInput,
  };
};
