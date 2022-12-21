import { NextFunction, Request, Response } from 'express';

import { ALLOWED_ORIGINS } from '~/utils/server';

export const credentials = (req: Request, res: Response, next: NextFunction) => {
  const { origin } = req.headers;

  if (ALLOWED_ORIGINS.includes(origin as string)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  next();
};
