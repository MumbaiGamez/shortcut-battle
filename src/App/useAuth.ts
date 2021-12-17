import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '@redux/slices/settingsSlice';
import { useGetUserQuery } from '@redux/api/userApi';
import { useOAuthMutation } from '@redux/api/authApi';

import { getUserOAuthCode } from '@utils/getUserOAuthCode';

export const useAuth = () => {
  const [OAuth] = useOAuthMutation();

  const isAuth = useSelector(selectIsAuth);

  const code = getUserOAuthCode();

  useEffect(() => {
    if (!isAuth && code) {
      if (code) {
        OAuth(code);
      }
    }
  }, [OAuth, code, isAuth]);

  useGetUserQuery();
};
