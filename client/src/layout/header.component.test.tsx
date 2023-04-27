import React from 'react';

import { describe, expect, it } from 'vitest';
import { AuthenticationProvider } from '~/accounts/authentication/authentication.context';

import { render, screen } from '~/test/utils';

import Header from './header.component';

describe('Header', () => {
  it('should render the header', () => {
    render(
      <AuthenticationProvider>
        <Header />
      </AuthenticationProvider>,
    );
    expect(screen.getByRole('heading', { name: /hello/i })).toBeInTheDocument();
  });
});
