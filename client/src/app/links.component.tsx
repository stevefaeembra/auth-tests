import { FC, ReactElement } from 'react';

import { Link } from 'react-router-dom';

export const Links: FC = (): ReactElement => (
  <section>
    <h1>Links</h1>

    <br />

    <div className="px-4">
      <h2>Public</h2>
      <br />
      <div className="px-4">
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
      </div>

      <br />

      <h2>Private</h2>

      <div className="px-4">
        <Link to="/">Home</Link>
        <br />
        <Link to="/editor">Editors Page</Link>
        <br />
        <Link to="/admin">Admin Page</Link>
      </div>
    </div>
  </section>
);
