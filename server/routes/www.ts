import { Router } from 'express';

import { www } from '../controllers';

export const appRoutes = (router: Router) => {
  router.get('/*', www.renderApp);
  router.use(www.handleError);
};
