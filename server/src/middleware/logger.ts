import * as fs from 'fs';
import { promises } from 'fs';
import path from 'path';

import { format } from 'date-fns';
import { NextFunction, Request, Response } from 'express';

import { FORMAT_STRING } from '~/utils/dates';

export const logEvent = async (message: string, filename: string) => {
  const dateTime = `${format(new Date(), FORMAT_STRING)}`;
  const logLine = `${dateTime}\t${message}\n`;

  try {
    const pathName = path.join(__dirname, '../logs');
    if (!fs.existsSync(pathName)) {
      await promises.mkdir(pathName);
    }

    await promises.appendFile(path.join(pathName, filename), logLine);
  } catch (error) {
    console.error(error);
  }
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'middleware.log');

  next();
};
