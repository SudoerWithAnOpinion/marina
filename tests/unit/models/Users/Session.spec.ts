import { describe, expect, it, expectTypeOf, vi } from 'vitest';

vi.mock('sequelize');
import { Sequelize } from 'sequelize';
import Session from '$models/Users/Session';
import User from '$models/Users/User';

describe('Session', () => {
  it('should be constructable', () => {
    const session = new Session();
    expectTypeOf(session).toEqualTypeOf<Session>();
    vi.resetAllMocks();
  });
  it('should have static properties', () => {
    expectTypeOf(Session).toHaveProperty('associations').toBeObject();
  });
  it('should have static methods', () => {
    expectTypeOf(Session).toHaveProperty('initialize').toBeFunction();
    expectTypeOf(Session).toHaveProperty('associate').toBeFunction();
  });
  describe('associations', () => {
    it('should be associated with User', () => {
      Session.associate();
      expectTypeOf(Session).toHaveProperty('associations').toHaveProperty('user').toEqualTypeOf<Association<Session, User>>();
      expect(Session.belongsTo).toBeCalledWith(User, {
        foreignKey: 'user_id',
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'user'
      });
    });
  });
  it('should have instance properties', () => {
    const session = new Session();
    expectTypeOf(session).toHaveProperty('id').toEqualTypeOf<string>();
    expectTypeOf(session).toHaveProperty('active_expires').toEqualTypeOf<number>();
    expectTypeOf(session).toHaveProperty('idle_expires').toEqualTypeOf<number>();
  });
  describe('initialization', () => {
    it('should initialize', () => {
      const sequelize = new Sequelize();
      User.initialize(sequelize);
    });
  });
});