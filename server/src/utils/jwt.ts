import jwt from 'jsonwebtoken';

const ENCODING = 'base64';
const FORMAT = 'ascii';

if (!process.env.PUBLIC_KEY) {
  throw new Error('PUBLIC_KEY Environment Variable must be defined');
}

if (!process.env.PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY Environment Variable must be defined');
}

const publicKey = Buffer.from(process.env.PUBLIC_KEY, ENCODING).toString(FORMAT);
const privateKey = Buffer.from(process.env.PRIVATE_KEY, ENCODING).toString(FORMAT);

export function verifyJwt<T>(token: string): T | null {
  try {
    const payload = jwt.verify(token, publicKey) as T;

    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
