import { useState } from 'react';

export const useTopicListItem = (numberComments: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);

  const switchTextView = () => {
    setIsOpen((prevState) => !prevState);
  };

  const switchComments = () => {
    setIsShowComments((prevState) => !prevState);
  };

  const commentsText = `${
    isShowComments ? 'Hide' : 'Show'
  } ${numberComments} comments`;

  return {
    commentsText,
    isOpen,
    isShowComments,
    switchTextView,
    switchComments,
  };
};
