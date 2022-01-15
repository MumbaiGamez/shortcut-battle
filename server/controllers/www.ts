import { RequestHandler, ErrorRequestHandler } from 'express';

export const renderApp: RequestHandler = (req, res) => {
  res.renderReact();
};

export const handleError: ErrorRequestHandler = (err, req, res) => {
  console.error(err.stack);

  res.status(err.statusCode).send(err.message || 'Something went wrong...');
};
