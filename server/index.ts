import express, { ErrorRequestHandler } from 'express';

import { render } from './middlewares';
import router from './router';

const PORT = process.env.PORT || 3000;

const app = express();

const handleError: ErrorRequestHandler = (err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong...');
};

app.use(render);
app.use(router);
app.use(handleError);

app
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err.stack);
  });
