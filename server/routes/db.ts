import { Router } from 'express';

import { validateUser, validateSettings } from '../middlewares/validator';
import { getSettings, getUser, updateSettings } from '../controllers/db';

export const dbRoutes = (router: Router) => {
  router.get('/users/:id', getUser);
  router.get('/users/settings', validateUser, getSettings);
  router.put('/users/settings', validateUser, validateSettings, updateSettings);
};
