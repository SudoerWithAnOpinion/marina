import { describe, expect, it, expectTypeOf, vi } from 'vitest';

vi.mock('sequelize');
import { Sequelize, type ForeignKey } from 'sequelize';

import Job from '$models/Jobs/Job';
import JobEvent from '$models/Jobs/JobEvent';
import Printer from '$models/Printers/Printer';

describe('JobEvent', () => {
  it('should be constructable', () => {
    const jobEvent = new JobEvent();
    expectTypeOf(jobEvent).toEqualTypeOf<JobEvent>();
    vi.resetAllMocks();
  });

  it('should have static properties', () => {
    expectTypeOf(JobEvent).toHaveProperty('associations').toHaveProperty('job')
    expectTypeOf(JobEvent).toHaveProperty('associations').toHaveProperty('printer')
  });
  it('should have static methods', () => {
    expectTypeOf(JobEvent).toHaveProperty('initialize').toBeFunction();
    expectTypeOf(JobEvent).toHaveProperty('associate').toBeFunction();
  });
  it('should have instance properties', () => {
    const jobEvent = new JobEvent();
    expectTypeOf(jobEvent).toHaveProperty('eventId').toBeString();
    expectTypeOf(jobEvent).toHaveProperty('jobId').toEqualTypeOf<ForeignKey<Job['jobId']>>();
    expectTypeOf(jobEvent).toHaveProperty('job').toBeNullable();
    expectTypeOf(jobEvent).toHaveProperty('printerId').toEqualTypeOf<ForeignKey<Printer['printerId']> | null>();
    expectTypeOf(jobEvent).toHaveProperty('printer').toBeNullable();

  });
  describe('associations', () => {
    it('should be associated with Job', () => {
      JobEvent.associate();
      expectTypeOf(JobEvent).toHaveProperty('associations').toHaveProperty('job').toEqualTypeOf<Association<JobEvent, Job>>();
      expect(JobEvent.belongsTo).toBeCalledWith(Job, {
        foreignKey: 'jobId',
        targetKey: 'jobId',
        as: 'job'
      });
      expectTypeOf(JobEvent).toHaveProperty('associations').toHaveProperty('printer').toEqualTypeOf<Association<JobEvent, Printer>>();
      expect(JobEvent.hasOne).toBeCalledWith(Printer, {
        foreignKey: 'printerId',
        sourceKey: 'printerId',
        as: 'printer',
        constraints: false
      });
    });
  });

  describe('initialization', () => {
    it('should initialize', () => {
      const sequelize = new Sequelize();
      const JobEventSpy = vi.spyOn(JobEvent, 'initialize');
      JobEvent.initialize(sequelize);
      expect(JobEventSpy).toHaveBeenCalled();
    });
  });
});