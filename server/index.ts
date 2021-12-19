import express from 'express';

import { render } from './middlewares';
import router from './router';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(render);
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
