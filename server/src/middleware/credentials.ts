import { NextFunction, Request, Response } from 'express';

import { ALLOWED_ORIGINS } from '~/utils/server';

/**
 * Expose the response to the browser client, if the origin of the
 * request is in the list of permitted origins.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const credentials = (req: Request, res: Response, next: NextFunction) => {
  const { origin } = req.headers;

  if (ALLOWED_ORIGINS.includes(origin as string)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  next();
};
