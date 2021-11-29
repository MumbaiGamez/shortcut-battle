import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLogoutMutation } from '../../redux/api/authApi';
import { selectIsAuth } from '../../redux/slices/settingsSlice';

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
          isShow: true,
        },
        {
          link: RoutesList.play,
          name: 'Play',
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
          link: RoutesList.logout,
          name: 'Logout',
          handleClick: handleLogout,
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
    [closeMenu, handleLogout, isAuth]
  );

  return { isMenuOpen, navigationLinks, toggleMenu };
};
