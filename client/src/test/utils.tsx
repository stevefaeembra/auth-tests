import { ReactElement, ReactNode } from 'react';

import { RenderOptions } from '@storybook/addons';
import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import { RenderHookOptions, RenderHookResult, render, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthenticationProvider } from '~/accounts/authentication/authentication.context';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
};

const queryClient = new QueryClient(queryClientConfig);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {
    wrapper: ({ children }: { children: ReactNode }): ReactElement => (
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </MemoryRouter>
    ),
    ...options,
  });

/**
 * Custom renderHook to replace renderHook from testing library
 *
 * @param callback - callback that wraps the hook being tested
 * @param options - An options object to modify the execution of renderHook
 *
 * @returns - object, see here for shape: https://react-hooks-testing-library.com/reference/api#renderhook-result
 */
const customRenderHook = <T, P>(
  callback: () => unknown,
  options?: RenderHookOptions<unknown>,
): RenderHookResult<T, P> => {
  const wrapper = ({ children }: { children: ReactNode }): ReactElement => (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );

  const utils = renderHook(() => callback(), { wrapper, ...options });
  return utils as RenderHookResult<T, P>;
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
// overide renderHook export
export { customRenderHook as renderHook };
