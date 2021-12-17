import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLogoutMutation } from '@redux/api/authApi';
import { selectIsAuth } from '@redux/slices/settingsSlice';

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

  const [logout] = useLogoutMutation();

  const isAuth = useSelector(selectIsAuth);

  const toggleMenu = useCallback(
    () => setIsMenuOpen((prevState) => !prevState),
    []
  );

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleLogout = useCallback(() => {
    logout();
    closeMenu();
  }, [closeMenu, logout]);

  const navigationLinks = useMemo(
    () =>
      [
        {
          link: RoutesList.home,
          name: 'Home',
          handleClick: closeMenu,
          isShown: true,
        },
        {
          link: RoutesList.play,
          name: 'Play',
          handleClick: closeMenu,
          isShown: true,
        },
        {
          link: RoutesList.login,
          name: 'Login',
          handleClick: closeMenu,
          isShown: !isAuth,
        },
        {
          link: RoutesList.leaderboard,
          name: 'Leaders',
          handleClick: closeMenu,
          isShown: isAuth,
        },
        {
          link: RoutesList.profile,
          name: 'Profile',
          handleClick: closeMenu,
          isShown: isAuth,
        },
        {
          link: RoutesList.logout,
          name: 'Logout',
          handleClick: handleLogout,
          isShown: isAuth,
        },
      ].filter((link) => link.isShown),
    [closeMenu, handleLogout, isAuth]
  );

  return { isMenuOpen, navigationLinks, toggleMenu };
};
