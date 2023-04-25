import { describe, expect, it } from 'vitest';
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
    const { result } = renderHook<Result, unknown>(() => useLogin());
    server.use(rest.post(ENDPOINT, (req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'User not found' }))));
    act(() => {
      result.current.mutate(loginData);
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual({ message: 'User not found' });
    });
  });
  it('should throw an error for an known user with wrong password', async () => {
    const loginData = { email: 'john@example.com', password: 'otherpassword', accessToken: 'foobar' };
    const { result } = renderHook(() => useLogin());
    server.use(
      rest.post(ENDPOINT, (req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'Incorrect password' }))),
    );
    act(() => {
      result.current.mutate(loginData);
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual({ message: 'Incorrect password' });
      return result.current.isError;
    });
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
    server.use(rest.post(ENDPOINT, (req, res, ctx) => res(ctx.status(200), ctx.json(mockResponse))));
    act(() => {
      result.current.mutate(loginData);
    });

    await waitFor(() => {
      //console.log('XXX', result.current);
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
      //return result.current.isError;
    });
  });
});
