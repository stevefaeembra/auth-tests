import { NextFunction, Request, Response } from 'express';

import { ALLOWED_ORIGINS } from '~/utils/server';

export const origins = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  if (!origin) {
    throw new Error('No origin set');
  }

  if (ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  next();
};
