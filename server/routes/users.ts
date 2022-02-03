import { Router } from 'express';

import { validateUser, validateSettings } from '../middlewares/validator';
import { getSettings, getUser, updateSettings } from '../controllers/users';

import { UserAPI } from '../@types/api';

const usersRouter = Router();

usersRouter.get(UserAPI.byId, getUser);
usersRouter.get(UserAPI.settings, validateUser, getSettings);
usersRouter.put(
  UserAPI.settings,
  validateUser,
  validateSettings,
  updateSettings
);

export default usersRouter;
