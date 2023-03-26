import { FC, ReactElement } from 'react';

import { Link } from 'react-router-dom';

export const Lounge: FC = (): ReactElement => (
  <section>
    <h1>The Lounge</h1>

    <br />

    <p>Admins and Editors can hang out here.</p>

    <div className="flex p-4">
      <Link to="/">Home</Link>
    </div>
  </section>
);
