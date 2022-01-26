import { Router } from 'express';

import { renderApp, handleError } from '../controllers/www';

const wwwRouter = Router();

wwwRouter.get('/*', renderApp);
wwwRouter.use(handleError);

export default wwwRouter;
