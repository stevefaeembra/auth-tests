import React from 'react';

import { expect, it } from 'vitest';
import { AuthenticationProvider } from '~/accounts/authentication/authentication.context';

import { render, screen } from '~/test/utils';

import App from './app.component';

describe('App', () => {
  it('should render the whole app', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /hello/i })).toBeInTheDocument();
  });
});
