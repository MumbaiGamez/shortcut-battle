import { RoutesList } from './../../components/NavigationMenu/useNavigationMenu';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '../../redux/settingsSlice';

export const useLoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth) {
      navigate(RoutesList.home);
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
