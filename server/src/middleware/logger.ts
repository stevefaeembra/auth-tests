import * as fs from 'fs';
import { promises } from 'fs';
import path from 'path';

import { format } from 'date-fns';
import { NextFunction, Request, Response } from 'express';

import { LOGGING_DATE_FORMAT } from '~/utils/dates';

/**
 * Log an event's message to the specified file
 *
 * @param {string} message
 * @param {string} filename
 */
export const logEvent = async (message: string, filename: string) => {
  const dateTime = `${format(new Date(), LOGGING_DATE_FORMAT)}`;
  const logLine = `${dateTime}\t${message}\n`;

  try {
    const pathName = path.join(__dirname, '../../logs');
    // Create log directory, if it doesn't already exist
    if (!fs.existsSync(pathName)) {
      await promises.mkdir(pathName);
    }

    // Add message to the end of the logfile
    await promises.appendFile(path.join(pathName, filename), logLine);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Log requests to the server.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requests.log');

  next();
};
