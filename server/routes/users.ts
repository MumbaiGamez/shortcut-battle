import { Router } from 'express';

import { validateUser, validateSettings } from '../middlewares/validator';
import { getSettings, getUser, updateSettings } from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/:id', getUser);
usersRouter.get('/settings', validateUser, getSettings);
usersRouter.put('/settings', validateUser, validateSettings, updateSettings);

export default usersRouter;
