import { FC, ReactElement } from 'react';

import { Link } from 'react-router-dom';

export const Editor: FC = (): ReactElement => (
  <section>
    <h1>Editors Page</h1>

    <br />

    <p>You must have been assigned an Editor role.</p>

    <div className="flex p-4">
      <Link to="/">Home</Link>
    </div>
  </section>
);
