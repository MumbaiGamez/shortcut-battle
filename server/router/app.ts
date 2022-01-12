import { Router } from 'express';
import { renderApp } from '../controllers';

export const appRoutes = (router: Router) => {
  router.get('/*', renderApp);
};
