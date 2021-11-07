export enum RoutesList {
  home = '/',
  login = '/login',
  register = '/register',
  library = '/library',
}

export type ValidationRules = {
  minSymbols?: number;
  phone?: boolean;
  email?: boolean;
  isRequired?: boolean;
};
