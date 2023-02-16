import { cleanup, render, fireEvent, screen } from '@testing-library/svelte';
import { assert, describe, expect, it, afterEach } from 'vitest';
import SpoolCard from '$components/Materials/SpoolCard.svelte';

import { materials } from '../../mockData';

describe('SpoolCard', () => {
  afterEach(() => cleanup());

  describe('Mock: New Spool', () => {
    const results = render(SpoolCard, {
      props: {
        material: materials[0]
      },
    });

    it('should render', () => {
      expect(results.container).toBeTruthy();
    });

  });
});