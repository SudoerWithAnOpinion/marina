import { assert, describe, expect, it, afterEach, expectTypeOf, vi } from 'vitest';

vi.mock('sequelize');
import Job from '$models/Jobs/Job';

describe('Job', () => {
  it('should be constructable', () => {
    const job = new Job();
    expectTypeOf(job).toEqualTypeOf<Job>();
    vi.resetAllMocks();
  });
  it('should have static properties', () => {
    expectTypeOf(Job).toHaveProperty('initialize').toBeFunction();
    expectTypeOf(Job).toHaveProperty('associate').toBeFunction();
    expectTypeOf(Job).toHaveProperty('associations').toHaveProperty('events')
  });
  it('should have instance properties', () => {
    const job = new Job();
    expectTypeOf(job).toHaveProperty('printerId').toBeString();
    expectTypeOf(job).toHaveProperty('name').toBeString();
  });

});