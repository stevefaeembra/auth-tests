import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User, UserModel } from '~/users/user.model';
import { BAD_REQUEST_ERROR, FORBIDDEN_ERROR, UNAUTHORIZED_ERROR } from '~/utils/http';

import { ACCESS_TOKEN_DURATION, COOKIE_MAX_AGE, REFRESH_TOKEN_DURATION } from './accounts.constants';

export const login = async (req: Request, res: Response) => {
  console.log('LOGGING IN: ', req.body);
  // console.log('ENV COOKIE NAME: ', process.env.refreshCookieName);
  const refreshCookieName = process.env.REFRESH_COOKIE_NAME;
  // console.log('LOGIN REFRESH COOKIE NAME: ', refreshCookieName);
  if (!refreshCookieName) {
    throw new Error('Missing Environment Variable for the cookie name');
  }

  const cookies = req.cookies;
  // const { email, password } = await req.json();
  const { email, password } = await req.body;
  // console.log('LOGIN DETAILS: ', { email, password });

  if (!email || !password) {
    return res.status(BAD_REQUEST_ERROR).json({ message: 'Username and password are required' });
  }

  const existingUser = await UserModel.findOne({ email }).exec();

  if (!existingUser) {
    return res.sendStatus(UNAUTHORIZED_ERROR);
  }

  // Check password
  const doesPasswordMatch = await bcrypt.compare(password, existingUser.password);

  if (doesPasswordMatch) {
    // console.log('PASSWORD MATCHES');
    // Get the role codes for the existing user.
    // Remove any null values, if they exist.
    // FIXME: How can null values exist???
    // const roles = Object.values(existingUser.roles).filter(Boolean);
    // console.log('ROLES: ', roles);

    // Create access and refresh JWTs.
    const accessToken = jwt.sign({ email: existingUser.email }, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: ACCESS_TOKEN_DURATION,
    });
    const refreshToken = jwt.sign({ email: existingUser.email }, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: REFRESH_TOKEN_DURATION,
    });

    let validRefreshTokens = !cookies[refreshCookieName]
      ? existingUser.refreshTokens
      : existingUser.refreshTokens.filter(token => token !== cookies[refreshCookieName]);

    // console.log('VALID REFRESH TOKENS: ', validRefreshTokens);

    // console.log('BEFORE COOKIES: ', cookies);
    if (cookies[refreshCookieName]) {
      // console.log('UPDATING WITH COOKIE: ', cookies[refreshCookieName]);
      // It's possible the user logged in, but never
      // used the refresh token, or logged out. It
      // could be possibl that the refresh token was
      // stolen, so we need to make sure we check
      // the re-use of the token.
      const cookieRefreshToken = cookies[refreshCookieName];
      // console.log('COOKIES: ', cookies);
      // console.log('LOGIN GOT COOKIE REFRESH TOKEN: ', cookieRefreshToken);
      const usersRefreshToken = await UserModel.findOne({ refreshTokens: cookieRefreshToken }).exec();
      // console.log('USER with REFRESH TOKENS: ', usersRefreshToken);

      // Check token hasn't been re-used.
      if (!usersRefreshToken) {
        console.log('Attempted refresh token re-use at login');
        validRefreshTokens = [];
      }

      res.clearCookie(refreshCookieName, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
    }

    // Put new refresh token into database against current user.
    existingUser.refreshTokens = [...validRefreshTokens, refreshToken];
    const result: User = await existingUser.save();
    console.log('USER WITH NEW REFRESH TOKEN: ', result);
    console.log('USER DOC: ', result._doc);
    console.log('REFRESH TOKEN NAME: ', refreshCookieName);

    // Set the http only cookie, to have the new
    // refresh token.
    res.cookie(refreshCookieName, refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: COOKIE_MAX_AGE,
    });

    res.json({ id: result._doc._id, accessToken });
  } else {
    res.sendStatus(FORBIDDEN_ERROR);
  }
};
