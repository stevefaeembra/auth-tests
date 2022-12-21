import { Request, Response } from 'express';

import { INTERNAL_SERVER_ERROR } from '~/utils/http';

import { logEvent } from './logger';

export const errorHandler = (error: Error, req: Request, res: Response) => {
  logEvent(`${error.name}: ${error.message}`, 'error.log');

  console.error(error.stack);

  res.status(500).send(error.message);
  res.status(INTERNAL_SERVER_ERROR).send(error.message);
};
