/*eslint import/namespace: ["off"]*/
import { describe, expect, it } from 'vitest';

import { HTTP_BAD_REQUEST, HTTP_OK } from '~/api/api.constants';
import { rest, server } from '~/mocks/server';
import { act, renderHook, waitFor } from '~/test/utils';

import { useLogin } from './login.hook';

const ENDPOINT = '*/api/accounts/';

interface Result {
  isSuccess: boolean;
  isError: boolean;
  data: Record<string, unknown>;
  mutate: (form: Record<string, unknown>) => void;
  error: Record<string, unknown>;
  current: Record<string, unknown>;
}

describe('useLoginHook', () => {
  it('should throw an error for an unknown user', async () => {
    const loginData = { email: 'bob@example.com', password: 'otherpassword', accessToken: 'foobar' };
    server.use(rest.post(ENDPOINT, (req, res, ctx) => res(ctx.status(200), ctx.json({ message: 'User not found' }))));
    const { result } = renderHook<Result, unknown>(() => useLogin());

    act(() => {
      result.current.mutate(loginData);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(false));
  });

  it('should throw an error for an known user with wrong password', async () => {
    const loginForm = { email: 'john@example.com', password: 'otherpassword', accessToken: 'foobar' };
    server.use(
      rest.post(ENDPOINT, (req, res, ctx) =>
        res(ctx.status(HTTP_BAD_REQUEST), ctx.json({ message: 'Incorrect password' })),
      ),
    );
    const { result } = renderHook<Result, unknown>(() => useLogin());

    await act(() => result.current.mutate(loginForm));

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('should return data if credentials are correct', async () => {
    const loginData = { email: 'john@example.com', password: 'mypassword' };
    const { result } = renderHook<Result, unknown>(() => useLogin());

    const mockResponse = {
      email: 'john@example.com',
      firstName: 'John',
      id: 1,
      lastName: 'Smith',
      password: 'mypassword',
      roles: [1, 3],
    };

    server.use(rest.post(ENDPOINT, (req, res, ctx) => res(ctx.status(HTTP_OK), ctx.json(mockResponse))));

    act(() => {
      result.current.mutate(loginData);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
