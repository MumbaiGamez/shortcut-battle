import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLogoutMutation } from '@redux/api/authApi';
import { selectIsAuth } from '@redux/slices/settingsSlice';
import { useTranslation } from 'react-i18next';

export enum RoutesList {
  all = '*',
  home = '/',
  forum = '/forum',
  leaderboard = '/leaderboard',
  library = '/library',
  logout = '/logout',
  login = '/login',
  play = '/play',
  profile = '/profile',
  register = '/register',
}

export const useNavigationMenu = () => {
  const { t } = useTranslation();

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
          name: t('nav.home'),
          handleClick: closeMenu,
          isShown: true,
        },
        {
          link: RoutesList.play,
          name: t('nav.play'),
          handleClick: closeMenu,
          isShown: true,
        },
        {
          link: RoutesList.login,
          name: t('nav.login'),
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
          link: RoutesList.forum,
          name: 'Forum',
          handleClick: closeMenu,
          isShown: true,
        },
        {
          link: RoutesList.logout,
          name: 'Logout',
          handleClick: handleLogout,
          isShown: isAuth,
        },
      ].filter((link) => link.isShown),
    [closeMenu, handleLogout, isAuth, t]
  );

  return { isMenuOpen, navigationLinks, toggleMenu };
};
