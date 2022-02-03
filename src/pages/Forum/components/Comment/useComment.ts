import { useSelector } from 'react-redux';

import { selectIsAuth } from '@redux/slices/settingsSlice';
import { useAddCommentMutation } from '@redux/api/forumApi';

export const useComment = () => {
  const [addComment, { isLoading }] = useAddCommentMutation();

  const isAuth = useSelector(selectIsAuth);

  return {
    addComment,
    isAuth,
    isLoading,
  };
};
