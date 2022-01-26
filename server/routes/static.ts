import * as path from 'path';
import { Router, static as staticRoute } from 'express';

import { isDev } from '../../lib/env';

const STATIC_DIR = path.resolve(__dirname, `../../${isDev ? 'dist/' : ''}`);
const LOCALES_DIR = path.resolve(__dirname, '../locales');
const SW = path.resolve(STATIC_DIR, 'sw.js');

const staticRouter = Router();

staticRouter.use(staticRoute(STATIC_DIR));
staticRouter.use('/locales', staticRoute(LOCALES_DIR));

staticRouter.get('/sw.js', (req, res) => {
  res.writeHead(201, { 'Content-Type': 'application/javascript' });
  res.sendFile(SW);
});

export default staticRouter;
