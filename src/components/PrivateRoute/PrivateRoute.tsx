import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RoutesList } from '../NavigationMenu/useNavigationMenu';

import { selectIsAuth } from '../../redux/settingsSlice';

type PrivateRouteProps = {
  element: JSX.Element;
};

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { element } = props;

  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return element;
  }

  return <Navigate to={RoutesList.login} />;
};
