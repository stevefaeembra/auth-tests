// eslint-disable-next-line import/no-unassigned-import
import 'module-alias/register';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { corsOptions } from '~/middleware/cors';
import { credentials } from '~/middleware/credentials';
import { errorHandler } from '~/middleware/errors';
import { logger } from '~/middleware/logger';

import { connectToDB } from './db';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

connectToDB();

const app = express();
app.use(logger);
// Handle options credentials check before CORS and fetch.
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

// built-in middleware to handle url encoded data e.g. form data of type
// `content-type: application/x-www-form-urlencoded`.
app.use(express.urlencoded({ extended: false }));
// built-in middleware to handle json data.
app.use(express.json());

// Routing;

// This should be last
app.use(errorHandler);

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log('Server listening on port: ', PORT));
});
