import { FC, ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { UserList } from './user-list.component';

export const Admin: FC = (): ReactElement => (
  <section>
    <h1>Admins Page</h1>

    <br />

    <UserList />

    <br />

    <div className="flex p-4">
      <Link to="/">Home</Link>
    </div>
  </section>
);
