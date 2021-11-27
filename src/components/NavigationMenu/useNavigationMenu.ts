import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLogoutMutation } from '../../redux/api/authApi';

import { selectIsAuth } from '../../redux/settingsSlice';

export enum RoutesList {
  all = '*',
  home = '/',
  leaderboard = 'leaderboard',
  library = '/library',
  logout = '/logout',
  login = '/login',
  play = '/play',
  profile = '/profile',
  register = '/register',
}

export const useNavigationMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [logoutAction] = useLogoutMutation();

  const isAuth = useSelector(selectIsAuth);

  const toggleMenu = useCallback(
    () => setIsMenuOpen((prevState) => !prevState),
    []
  );

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const logout = useCallback(() => {
    logoutAction();
    closeMenu();
  }, [closeMenu, logoutAction]);

  const navigationLinks = useMemo(
    () =>
      [
        {
          link: RoutesList.home,
          name: 'Home',
          handleClick: closeMenu,
          isShow: true,
        },
        {
          link: RoutesList.login,
          name: 'Login',
          handleClick: closeMenu,
          isShow: !isAuth,
        },
        {
          link: RoutesList.play,
          name: 'Play',
          handleClick: closeMenu,
          isShow: isAuth,
        },
        {
          link: RoutesList.logout,
          name: 'Logout',
          handleClick: logout,
          isShow: isAuth,
        },
        {
          link: RoutesList.leaderboard,
          name: 'Leaders',
          handleClick: closeMenu,
          isShow: isAuth,
        },
        {
          link: RoutesList.profile,
          name: 'Profile',
          handleClick: closeMenu,
          isShow: isAuth,
        },
      ].filter((link) => link.isShow),
    [closeMenu, logout, isAuth]
  );

  return { isMenuOpen, navigationLinks, toggleMenu };
};
