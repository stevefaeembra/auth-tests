import { describe, expect, it } from 'vitest';
import { rest, server } from '~/mocks/server';
import { act, renderHook, waitFor } from '~/test/utils';
import { useRegister } from './register.hook';

const ENDPOINT = '*/api/accounts/register/';

interface Result {
  id: Number;
  error?: { message: string };
  mutate: (form: Record<string, unknown>) => void;
  isError: boolean;
  isSuccess: boolean;
  data?: Record<string, unknown>;
}

describe('useRegisterHook', () => {
  it('should throw an error if any fields are missing', async () => {
    // we're missing the confirm password
    const expectedMessage = 'Confirm Password field is empty';
    server.use(
      rest.post(ENDPOINT, (req, res, ctx) => res(ctx.status(400), ctx.json({ error: { message: expectedMessage } }))),
    );
    const registerForm = {
      email: 'bob@example.com',
      firstName: 'Bob',
      lastName: 'Ross',
      password: 'otherpassword',
    };
    const { result } = renderHook<Result, unknown>(() => useRegister());
    act(() => {
      result.current.mutate(registerForm);
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual({ error: { message: expectedMessage } });
    });
  });

  it('should throw an error if email is malformed', async () => {
    // not a well-formed email address
    // we're missing the confirm password
    const expectedMessage = 'Email address not valid';
    server.use(
      rest.post(ENDPOINT, (req, res, ctx) => res(ctx.status(400), ctx.json({ error: { message: expectedMessage } }))),
    );
    const registerForm = {
      email: 'bob@example',
      firstName: 'Bob',
      lastName: 'Ross',
      password: 'otherpassword',
      confirmPassword: 'otherpassword',
    };
    const { result } = renderHook<Result, unknown>(() => useRegister());
    act(() => {
      result.current.mutate(registerForm);
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual({ error: { message: expectedMessage } });
    });
  });

  it('should throw an error if email has already been registered', async () => {
    // attempt to reuse existing email address
    const expectedMessage = 'An account already exists for this email address';
    server.use(
      rest.post(ENDPOINT, (req, res, ctx) => res(ctx.status(400), ctx.json({ error: { message: expectedMessage } }))),
    );
    const registerForm = {
      email: 'bob@example.com',
      firstName: 'Bob',
      lastName: 'Ross',
      password: 'notreallybob',
      confirmPassword: 'notreallybob',
    };
    const { result } = renderHook<Result, unknown>(() => useRegister());
    act(() => {
      result.current.mutate(registerForm);
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual({ error: { message: expectedMessage } });
    });
  });

  it('should return if registration was successful', async () => {
    // happy path
    const expectedResponse = { id: 1 };
    server.use(rest.post(ENDPOINT, (req, res, ctx) => res(ctx.status(200), ctx.json(expectedResponse))));
    const registerForm = {
      email: 'bob@example.com',
      firstName: 'Bob',
      lastName: 'Ross',
      password: 'mypassword',
      confirmPassword: 'mypassword',
    };
    const { result } = renderHook<Result, unknown>(() => useRegister());
    act(() => {
      result.current.mutate(registerForm);
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toEqual(1);
    });
  });
});
