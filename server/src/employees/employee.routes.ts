import express from 'express';

import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from './employee.controller';

export const router = express.Router();

// Define Employee API routes.
router.route('/').get(getEmployees).post(createEmployee);
router.route('/:id').get(getEmployee).put(updateEmployee).delete(deleteEmployee);
