import { cleanup, render, fireEvent, screen } from '@testing-library/svelte';
import { assert, describe, expect, it, afterEach } from 'vitest';
import QueueItemDetail from '$components/Queue/QueueItemDetail.svelte';

import { jobs } from '../../mockData';

describe('QueueItemDetail', () => {
  afterEach(() => cleanup());

  it('should render', () => {
    const { container } = render(QueueItemDetail, {
      job: jobs[0]
    });
    expect(container).toBeTruthy();
  });
});