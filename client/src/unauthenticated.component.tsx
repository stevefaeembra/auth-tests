import { FC, Fragment } from 'react';

import { Route } from 'react-router-dom';

import { Login } from '~/accounts/authentication/login.component';
import { Register } from '~/accounts/authentication/register.component';
import { Links } from '~/app/links.component';
import { Unauthorized } from '~/app/unauthorized.component';

const Unauthenticated: FC = () => (
  <Route path="/">
    <Route element={<Register />} path="register" />
    <Route element={<Login />} path="/login" />
    <Route element={<Links />} path="links" />
    <Route element={<Unauthorized />} path="unauthorized" />
  </Route>
);

export default Unauthenticated;
