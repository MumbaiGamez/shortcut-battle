import * as path from 'path';
import { Router, static as staticRoute } from 'express';

import { isDev } from '../../lib/env';

const STATIC_DIR = path.resolve(__dirname, `../../${isDev ? 'dist/' : ''}`);
const SW = path.resolve(STATIC_DIR, 'sw.js');

export const staticRoutes = (router: Router) => {
  router.use(staticRoute(STATIC_DIR));

  router.get('/sw.js', (req, res) => {
    res.writeHead(201, { 'Content-Type': 'application/javascript' });
    res.sendFile(SW);
  });
};
