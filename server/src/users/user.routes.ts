import express from 'express';

import { createUser, deleteUser, getUser, getUsers, updateUser } from './user.controller';

export const router = express.Router();

// Define User API routes.
router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
