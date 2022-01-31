import { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';

import { selectIsAuth } from '@redux/slices/settingsSlice';

import { useAddCommentMutation } from '@redux/api/forumApi';

export const useTopicListItem = (numberComments: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);

  const isAuth = useSelector(selectIsAuth);

  const [addComment, { isLoading }] = useAddCommentMutation();

  const switchTextView = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const switchComments = useCallback(() => {
    setIsShowComments((prevState) => !prevState);
  }, []);

  const commentsText = `${
    numberComments ? (isShowComments ? 'Hide' : 'Show') : ''
  } ${numberComments} comments`;

  return {
    addComment,
    commentsText,
    isAuth,
    isOpen,
    isLoading,
    isShowComments,
    switchTextView,
    switchComments,
  };
};
