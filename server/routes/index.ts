import { Router } from 'express';

import usersRouter from './users';
import forumRouter from './forum';
import staticRouter from './static';
import wwwRouter from './www';

import { ForumAPI, UserAPI } from '../@types/api';

const router = Router();

router.use(UserAPI.root, usersRouter);
router.use(ForumAPI.root, forumRouter);
router.use(staticRouter);
router.use(wwwRouter);

export default router;
