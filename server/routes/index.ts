import { Router } from 'express';

import usersRouter from './users';
import forumRouter from './forum';
import staticRouter from './static';
import wwwRouter from './www';

import { forum, user } from '../@types/api';

const router = Router();

router.use(user.index, usersRouter);
router.use(forum.index, forumRouter);
router.use(staticRouter);
router.use(wwwRouter);

export default router;
