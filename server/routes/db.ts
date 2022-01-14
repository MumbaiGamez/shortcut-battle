import { Router } from 'express';

import { getUser } from '../controllers/db';

export const dbRoutes = (router: Router) => {
  router.get('/users/:id', getUser);
};
