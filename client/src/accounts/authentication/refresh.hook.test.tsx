import { Result } from 'postcss';
import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '~/test/utils';
import { useRefresh } from './refresh.hook';

describe('useRefreshTokenHook', () => {
  it.todo('should return new tokens if session alive', async () => {});

  it.todo('should logout if session has expired', async () => {});
});
