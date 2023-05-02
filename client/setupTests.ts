// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom';
import '~/i18n/i18n';

import nodeFetch, { Request, Response } from 'node-fetch';

import { server } from './src/mocks/server';

// Monkey-patch fetch to allow tests to work in node (there's currently an
// issue with the node implementation of fetch in Undici, see
// https://github.com/apollographql/apollo-client/issues/10785#issuecomment-1527830658)
global.fetch = nodeFetch;
global.Request = Request;
global.Response = Response;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
