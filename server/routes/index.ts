import { Router } from 'express';

import usersRouter from './users';
import forumRouter from './forum';
import staticRouter from './static';
import wwwRouter from './www';

const router = Router();

router.use('/users', usersRouter);
router.use('/forum', forumRouter);
router.use(staticRouter);
router.use(wwwRouter);

export default router;
