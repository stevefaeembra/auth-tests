import { Request, Response } from 'express';

const config = {
  name: 'App Name',
};

export const appConfig = async (req: Request, res: Response) => res.json(config);
