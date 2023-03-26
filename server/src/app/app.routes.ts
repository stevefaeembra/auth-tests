import express from 'express';

import { appConfig } from './app.controller';

export const router = express.Router();

// Define User management API routes.
router.route('/config').get(appConfig);
