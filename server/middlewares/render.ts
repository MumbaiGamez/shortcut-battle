import { Request, Response, NextFunction } from 'express';

import { getPageHtml } from './html';
import { getBundleHtml } from './bundle';

export default (req: Request, res: Response, next: NextFunction) => {
  res.renderReact = () => {
    const bundleHtml = getBundleHtml(req);
    const html = getPageHtml(bundleHtml);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  };

  next();
};
