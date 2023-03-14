import { describe, expect, it, expectTypeOf, vi } from 'vitest';

vi.mock('sequelize');
import { Sequelize } from 'sequelize';
import Key from '$models/Users/Key';
import User from '$models/Users/User';

describe('Key', () => {
  it('should be constructable', () => {
    const key = new Key();
    expectTypeOf(key).toEqualTypeOf<Key>();
    vi.resetAllMocks();
  });
  it('should have static properties', () => {
    expectTypeOf(Key).toHaveProperty('associations').toBeObject();
  });
  it('should have static methods', () => {
    expectTypeOf(Key).toHaveProperty('initialize').toBeFunction();
    expectTypeOf(Key).toHaveProperty('associate').toBeFunction();
  });
  describe('associations', () => {
    it('should be associated with User', () => {
      Key.associate();
      expectTypeOf(Key)
        .toHaveProperty('associations')
        .toHaveProperty('user')
        .toEqualTypeOf<Association<Key, User>>();
      expect(Key.belongsTo).toBeCalledWith(User, {
        foreignKey: 'user_id',
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'user'
      });
    });
  });
  it('should have instance properties', () => {
    const key = new Key();
    expectTypeOf(key).toHaveProperty('id').toEqualTypeOf<string>();
    expectTypeOf(key).toHaveProperty('hashed_password').toEqualTypeOf<string | null>();
    expectTypeOf(key).toHaveProperty('primary').toEqualTypeOf<boolean>();
  });
  describe('initialization', () => {
    it('should initialize', () => {
      const sequelize = new Sequelize();
      User.initialize(sequelize);
    });
  });
});
