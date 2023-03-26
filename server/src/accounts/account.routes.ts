import express from 'express';

import { login } from './login.controller';
import { logout } from './logout.controller';
import { refreshToken } from './refresh.controller';
import { register } from './register.controller';

export const router = express.Router();

// Define User management API routes.
router.route('/').get(logout).post(login);
router.route('/register').post(register);
router.route('/refresh').get(refreshToken);
