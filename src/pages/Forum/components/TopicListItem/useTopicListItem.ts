import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '@redux/slices/settingsSlice';

import { useAddCommentMutation } from '@redux/api/forumApi';

export const useTopicListItem = (numberComments: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);

  const { t } = useTranslation();

  const isAuth = useSelector(selectIsAuth);

  const [addComment, { isLoading }] = useAddCommentMutation();

  const switchTextView = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const switchComments = useCallback(() => {
    setIsShowComments((prevState) => !prevState);
  }, []);

  const commentsText = `${
    numberComments ? (isShowComments ? t('forum.hide') : t('forum.show')) : ''
  } ${numberComments} ${t('forum.comments')}`;

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
