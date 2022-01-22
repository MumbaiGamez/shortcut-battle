import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectIsAuth } from '@redux/slices/settingsSlice';
import { useGetTopicsQuery } from '@redux/api/forumApi';

export const useForum = () => {
  const isAuth = useSelector(selectIsAuth);

  const { data: topics, isLoading } = useGetTopicsQuery();

  const navigate = useNavigate();

  const goToNewTopicPage = () => {
    navigate('new');
  };

  return { isAuth, isLoading, goToNewTopicPage, topics };
};
