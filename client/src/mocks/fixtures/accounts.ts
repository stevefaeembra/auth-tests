import { Roles } from '~/app/app.component';

import { User } from '../handlers/authentication';

let users: User[] = [
  {
    id: 1,
    email: 'john@example.com',
    password: 'mypassword',
    firstName: 'John',
    lastName: 'Smith',
    roles: [Roles.USER, Roles.ADMIN],
  },
];

export const getUsers = () => users;

export const getUser = (id: number) => users.find(user => user.id === id);

export const addUser = (user: User) => {
  const id = users.length + 1;
  const newUser = { id, ...user };
  users = [...users, newUser];

  return newUser;
};

export const updateUser = (user: User) => (users = users.map(usr => (usr.id === user.id ? user : usr)));

export const deleteUser = (id: number) => (users = users.filter(user => (user.id === id ? false : true)));
