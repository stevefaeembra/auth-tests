import { CorsOptions } from 'cors';

import { ALLOWED_ORIGINS } from '~/utils/server';

type Origin = string | undefined;
type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];
type Callback = (err: Error | null, origin?: StaticOrigin) => void;

export const corsOptions: CorsOptions = {
  origin: (origin: Origin, callback: Callback) =>
    ALLOWED_ORIGINS.includes(origin as string) || !origin
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS')),
  optionsSuccessStatus: 200,
};
