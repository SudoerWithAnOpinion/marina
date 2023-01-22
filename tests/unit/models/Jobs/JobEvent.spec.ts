import { assert, describe, expect, it, afterEach, expectTypeOf, vi } from 'vitest';

vi.mock('sequelize');
import JobEvent from '$models/Jobs/JobEvent';

describe('JobEvent', () => {
  it('should be constructable', () => {
    const jobEvent = new JobEvent();
    expectTypeOf(jobEvent).toEqualTypeOf<JobEvent>();
    vi.resetAllMocks();
  });

  it('should have static properties', () => {
    expectTypeOf(JobEvent).toHaveProperty('initialize').toBeFunction();
    expectTypeOf(JobEvent).toHaveProperty('associate').toBeFunction();
    expectTypeOf(JobEvent).toHaveProperty('associations').toHaveProperty('job')
    expectTypeOf(JobEvent).toHaveProperty('associations').toHaveProperty('printer')
  });
  it('should have instance properties', () => {
    const jobEvent = new JobEvent();
    expectTypeOf(jobEvent).toHaveProperty('eventId').toBeString();
    expectTypeOf(jobEvent).toHaveProperty('jobId').toBeString();
    expectTypeOf(jobEvent).toHaveProperty('job').toBeNullable();
    expectTypeOf(jobEvent).toHaveProperty('printerId').toBeNullable();
    expectTypeOf(jobEvent).toHaveProperty('printer').toBeNullable();

  });
});