import { cleanup, render, fireEvent, screen } from '@testing-library/svelte';
import { assert, describe, expect, it, afterEach } from 'vitest';
import QueueItemDetail from '$components/Queue/QueueItemDetail.svelte';
import type Job from '$models/Jobs/Job';
import crypto from 'crypto';

describe('QueueItemDetail', () => {
  afterEach(() => cleanup()); // TODO: @testing-library/svelte claims to add this automatically but it doesn't work without explicit afterEach

  it('should render', () => {
    const { container } = render(QueueItemDetail, {
      props: {
        job: {
          jobId: crypto.randomUUID(),
          jobName: 'Test Job',
          createdAt: new Date(),
          updatedAt: new Date(),
          printerId: crypto.randomUUID()
        } as unknown as Job
      }
    });
    expect(container).toBeTruthy();
  });
});