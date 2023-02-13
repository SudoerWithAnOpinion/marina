import { cleanup, render, fireEvent, screen } from '@testing-library/svelte';
import { assert, describe, expect, it, afterEach } from 'vitest';
import QueueItemDetail from '$components/Queue/QueueItemDetail.svelte';

import { jobs } from '../../mockData';

describe('QueueItemDetail', () => {
  afterEach(() => cleanup());

  describe('Mock: Job Submitted', () => {
    const results = render(QueueItemDetail, {
      props: {
        job: jobs[0]
      },
    });

    it('should render', () => {
      // expect(container).toBeTruthy();
      expect(results.container).toBeTruthy();
    });

    it.todo('should show events in descending order');
    it.todo('should have event[0] as the submission (if any)');
  });
});