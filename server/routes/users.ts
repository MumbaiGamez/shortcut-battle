import { Router } from 'express';

import { validateUser, validateSettings } from '../middlewares/validator';
import { getSettings, getUser, updateSettings } from '../controllers/users';

import { user } from '../@types/api';

const usersRouter = Router();

usersRouter.get(user.byId, getUser);
usersRouter.get(user.settings, validateUser, getSettings);
usersRouter.put(user.settings, validateUser, validateSettings, updateSettings);

export default usersRouter;
