import { Router } from 'express';

import { staticRoutes } from './static';
import { dbRoutes } from './db';
import { appRoutes } from './www';

export const router = Router();

staticRoutes(router);
dbRoutes(router);
appRoutes(router);
