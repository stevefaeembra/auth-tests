import { FC, ReactElement } from 'react';

import { Route } from 'react-router-dom';

import { Roles } from '~/accounts/accounts.constants';
import { Admin } from '~/admin/admin.component';
import { Authorization } from '~/app/authorization.component';
import { Editor } from '~/app/editor.component';
import { Home } from '~/app/home.component';
import { Lounge } from '~/app/lounge.component';
import { Persistent } from '~/app/persistent.component';

const Authenticated: FC = () => (
  <Route element={<Persistent />}>
    <Route element={<Authorization roles={[Roles.USER]} />}>
      <Route element={<Home />} path="/" />
    </Route>

    <Route element={<Authorization roles={[Roles.EDITOR]} />}>
      <Route element={<Editor />} path="editor" />
    </Route>

    <Route element={<Authorization roles={[Roles.ADMIN]} />}>
      <Route element={<Admin />} path="admin" />
    </Route>

    <Route element={<Authorization roles={[Roles.EDITOR, Roles.ADMIN]} />}>
      <Route element={<Lounge />} path="lounge" />
    </Route>
  </Route>
);

export default Authenticated;
