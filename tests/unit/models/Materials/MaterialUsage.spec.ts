import { assert, describe, expect, it, expectTypeOf, vi } from 'vitest';
vi.mock('sequelize');
import { Sequelize } from 'sequelize';
import type { Association, CreationOptional, ForeignKey } from 'sequelize';
import Material from '$models/Materials/Material';
import MaterialUsage from '$models/Materials/MaterialUsage';

describe('Material', () => {
  it('should be constructable', () => {
    const materialUsage = new MaterialUsage();
    expectTypeOf(materialUsage).toEqualTypeOf<MaterialUsage>();
    vi.resetAllMocks();
  });
  it('should have static properties', () => {
    expectTypeOf(MaterialUsage).toHaveProperty('associations').toBeObject();
  });
  it('should have static methods', () => {
    expectTypeOf(MaterialUsage).toHaveProperty('initialize').toBeFunction();
    expectTypeOf(MaterialUsage).toHaveProperty('associate').toBeFunction();
  });
  describe('associations', () => {
    it('should be associated with Material', () => {
      MaterialUsage.associate();
      expectTypeOf(MaterialUsage)
        .toHaveProperty('associations')
        .toHaveProperty('material')
        .toEqualTypeOf<Association<MaterialUsage, Material>>();
      expect(MaterialUsage.belongsTo).toBeCalledWith(Material, {
        foreignKey: 'materialId',
        targetKey: 'materialId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        as: 'material'
      });
    });
  });
  it('should have instance properties', () => {
    const materialUsage = new MaterialUsage();
    expectTypeOf(materialUsage)
      .toHaveProperty('materialUsageId')
      .toEqualTypeOf<CreationOptional<number>>();
    expectTypeOf(materialUsage)
      .toHaveProperty('materialId')
      .toEqualTypeOf<ForeignKey<Material['materialId']>>();
    expectTypeOf(materialUsage).toHaveProperty('weightUsed').toEqualTypeOf<number>();
  });

  describe('initialization', () => {
    it('should initialize', () => {
      const sequelize = new Sequelize();
      MaterialUsage.initialize(sequelize);
    });
  });
});
