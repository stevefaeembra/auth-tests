/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom';
import '~/i18n/i18n';
// import nodeFetch, { Request, Response } from 'node-fetch';

import { server } from './src/mocks/server';

// Monkey-patch fetch to allow fetch() to work in node
// @ts-ignore
//global.fetch = fetch;
//global.fetch = nodeFetch;
// @ts-ignore
//global.Request = Request;
///@ts-ignore
//global.Response = Response;

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
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
