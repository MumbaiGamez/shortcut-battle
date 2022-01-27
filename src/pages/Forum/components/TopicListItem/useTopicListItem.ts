import { useState } from 'react';

import { useAddCommentMutation } from '@redux/api/forumApi';

export const useTopicListItem = (numberComments: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);

  const [addComment, { isLoading }] = useAddCommentMutation();

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
    addComment,
    commentsText,
    isOpen,
    isLoading,
    isShowComments,
    switchTextView,
    switchComments,
  };
};
