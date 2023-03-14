import { describe, expect, it, expectTypeOf, vi } from 'vitest';

vi.mock('sequelize');
import { Sequelize } from 'sequelize';
import User from '$models/Users/User';
import Key from '$models/Users/Key';
import Session from '$models/Users/Session';

describe('User', () => {
  it('should be constructable', () => {
    const user = new User();
    expectTypeOf(user).toEqualTypeOf<User>();
    vi.resetAllMocks();
  });
  it('should have static properties', () => {
    expectTypeOf(User).toHaveProperty('associations').toBeObject();
  });
  it('should have static methods', () => {
    expectTypeOf(User).toHaveProperty('initialize').toBeFunction();
    expectTypeOf(User).toHaveProperty('associate').toBeFunction();
  });
  describe('associations', () => {
    it('should be associated with Key', () => {
      User.associate();
      expectTypeOf(User)
        .toHaveProperty('associations')
        .toHaveProperty('keys')
        .toEqualTypeOf<Association<User, Key>>();
      expect(User.hasMany).toBeCalledWith(Key, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'keys'
      });
    });
    it('should be associated with Session', () => {
      User.associate();
      expectTypeOf(User)
        .toHaveProperty('associations')
        .toHaveProperty('sessions')
        .toEqualTypeOf<Association<User, Session>>();
      expect(User.hasMany).toBeCalledWith(Session, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'sessions'
      });
    });
  });
  it('should have instance properties', () => {
    const user = new User();
    expectTypeOf(user).toHaveProperty('id').toEqualTypeOf<string>();
    expectTypeOf(user).toHaveProperty('username').toEqualTypeOf<string>();
  });
  describe('initialization', () => {
    it('should initialize', () => {
      const sequelize = new Sequelize();
      User.initialize(sequelize);
    });
  });
});
