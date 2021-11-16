import { RoutesList } from '../NavigationMenu/useNavigationMenu';

export type NavigationLinkProps = {
  link: RoutesList;
  name: string;

  handleClick?(): void;
};
