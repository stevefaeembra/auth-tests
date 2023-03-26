import { FC, ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { useLogout } from '~/accounts/authentication/logout.hook';

export const Home: FC = (): ReactElement => {
  const { refetch: logout } = useLogout();

  return (
    <section>
      <h1>Home</h1>

      <br />

      <p>You are logged in!</p>

      <br />

      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/links">Go to the link page</Link>

      <div className="flex">
        <button className="cursor-pointer rounded-md border-2 border-white bg-green-500 p-2" onClick={() => logout()}>
          Sign Out
        </button>
      </div>
    </section>
  );
};
