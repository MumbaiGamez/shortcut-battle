import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '@redux/slices/settingsSlice';
import { useGetTopicsQuery } from '@redux/api/forumApi';

export const useForum = () => {
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);

  const isAuth = useSelector(selectIsAuth);

  const { data: topics, isLoading } = useGetTopicsQuery();

  const switchNewTopic = () => {
    setIsNewTopicOpen((prevState) => !prevState);
  };

  const isEmptyData = Boolean(topics?.length) === false;

  return {
    isAuth,
    isEmptyData,
    isLoading,
    isNewTopicOpen,
    switchNewTopic,
    topics,
  };
};
