import { describe, expect, it, expectTypeOf, vi } from 'vitest';

vi.mock('sequelize');
import { Sequelize } from 'sequelize';
import JobEvent from '$models/Jobs/JobEvent';
import Job from '$models/Jobs/Job';

describe('Job', () => {
  it('should be constructable', () => {
    const job = new Job();
    expectTypeOf(job).toEqualTypeOf<Job>();
    vi.resetAllMocks();
  });
  it('should have static properties', () => {
    expectTypeOf(Job).toHaveProperty('associations').toBeObject();
  });
  it('should have static methods', () => {
    expectTypeOf(Job).toHaveProperty('initialize').toBeFunction();
    expectTypeOf(Job).toHaveProperty('associate').toBeFunction();
  });
  describe('associations', () => {
    it('should be associated with JobEvent', () => {
      Job.associate();
      expectTypeOf(Job)
        .toHaveProperty('associations')
        .toHaveProperty('events')
        .toEqualTypeOf<Association<Job, JobEvent>>();
      expect(Job.hasMany).toBeCalledWith(JobEvent, {
        foreignKey: 'jobId',
        sourceKey: 'jobId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        as: 'events'
      });
    });
  });
  it('should have instance properties', () => {
    const job = new Job();
    expectTypeOf(job).toHaveProperty('printerId').toEqualTypeOf<string>();
    expectTypeOf(job).toHaveProperty('name').toEqualTypeOf<string>();
  });
  describe('initialization', () => {
    it('should initialize', () => {
      const sequelize = new Sequelize();
      Job.initialize(sequelize);
    });
  });
});
