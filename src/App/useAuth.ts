import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '@redux/slices/settingsSlice';
import { useGetUserQuery } from '@redux/api/userApi';
import { useOAuthMutation } from '@redux/api/authApi';

export const useAuth = () => {
  const [OAuth] = useOAuthMutation();

  const isAuth = useSelector(selectIsAuth);

  const url = window.location.search;

  useEffect(() => {
    if (!isAuth && url.includes('?code=')) {
      const code = url.split('?code=')[1];

      if (code) {
        OAuth(code);
      }
    }
  }, [OAuth, url, isAuth]);

  useGetUserQuery();
};
