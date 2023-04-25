import { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { act, renderHook, waitFor, screen } from '~/test/utils';
import { AuthenticationProvider } from './authentication.context';
import { useAuthentication } from './authentication.hook';

interface Foo {
  children: ReactNode;
  current: {
    userId: string;
    setUserId: Function;
    user: string;
    setUser: Function;
    accessToken: string;
    setAccessToken: Function;
  };
}

describe('useAuthenticationHook', () => {
  it.skip('should include the children', async () => {
    const expectedChildren = <h1>I am child</h1>;
    const wrapper = () => <AuthenticationProvider>{expectedChildren}</AuthenticationProvider>;
    renderHook<Foo, unknown>(() => useAuthentication(), { wrapper });
    act(() => {
      expect(screen.getByRole('heading', { name: /i am child/i })).toBeInTheDocument();
    });
  });
  it.only('should make the user details available', async () => {
    // check to see if the data shape matches that of the authentication context
    // const result = renderHook<Foo, unknown>(() => useAuthentication());
    const result = renderHook(() => useAuthentication());
    // console.log('result', result);
    await result.rerender();
    act(() => {
      //TODO workout why we get this odd nesting
      expect(result.result.current.accessToken).toBeNull();
    });
  });
});
