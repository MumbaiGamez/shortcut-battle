import { useCallback, useMemo, useState } from 'react';

import { authAPI } from '../../api/auth';

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

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const logout = useCallback(() => {
    authAPI.logout();
    closeMenu();
  }, [closeMenu]);

  const navigationLinks = useMemo(
    () => [
      { link: RoutesList.home, name: 'Home', handleClick: closeMenu },
      { link: RoutesList.login, name: 'Login', handleClick: closeMenu },
      { link: RoutesList.play, name: 'Play', handleClick: closeMenu },
      { link: RoutesList.logout, name: 'Logout', handleClick: logout },
      { link: RoutesList.leaderboard, name: 'Leaders', handleClick: closeMenu },
    ],
    [closeMenu, logout]
  );

  return { isMenuOpen, navigationLinks, toggleMenu };
};
