import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useLogoutMutation } from '@redux/api/authApi';
import { selectIsAuth } from '@redux/slices/settingsSlice';

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
          name: t('nav.leaders'),
          handleClick: closeMenu,
          isShown: isAuth,
        },
        {
          link: RoutesList.profile,
          name: t('nav.profile'),
          handleClick: closeMenu,
          isShown: isAuth,
        },
        {
          link: RoutesList.forum,
          name: t('nav.forum'),
          handleClick: closeMenu,
          isShown: true,
        },
        {
          link: RoutesList.logout,
          name: t('nav.logout'),
          handleClick: handleLogout,
          isShown: isAuth,
        },
      ].filter((link) => link.isShown),
    [closeMenu, handleLogout, isAuth, t]
  );

  return { isMenuOpen, navigationLinks, toggleMenu };
};
