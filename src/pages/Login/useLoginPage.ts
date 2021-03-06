import { RoutesList } from '@components/NavigationMenu/useNavigationMenu';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '@redux/slices/settingsSlice';

export const useLoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth) {
      navigate(RoutesList.play);
    }
  }, [isAuth, navigate]);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return {
    isLogin,
    toggleForm,
  };
};
