import { FC, ReactElement } from 'react';

import { useAuthentication } from '~/accounts/authentication/authentication.hook';
import { User, useUsers } from '~/accounts/users/users.hook';

interface Props {}

export const UserList: FC<Props> = (): ReactElement => {
  const { user } = useAuthentication();
  // console.log('USER MAKING REQUEST: ', user);
  const { data: users, isLoading, isError, error } = useUsers();
  // console.log('USERS FOUND: ', users);
  return (
    <>
      {users ? (
        <ul>
          {users.map((usr: User) => (
            <li key={usr.email}>{usr.email}</li>
          ))}
        </ul>
      ) : (
        <div>No Users Found</div>
      )}
    </>
  );
};

// {users ?
//       <ul>
//         {users.map(user => <li>{user.email}</li>)}
//       </ul> :
//       <div>No Users</div>
