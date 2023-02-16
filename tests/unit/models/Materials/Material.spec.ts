import { assert, describe, expect, it, expectTypeOf, vi } from 'vitest';
vi.mock('sequelize');
import { Sequelize } from 'sequelize';
import MaterialUsage from '$models/Materials/MaterialUsage';
import Material from '$models/Materials/Material';

describe('Material', () => {
  it('should be constructable', () => {
    const material = new Material();
    expectTypeOf(material).toEqualTypeOf<Material>();
    vi.resetAllMocks();
  });
  it('should have static properties', () => {
    expectTypeOf(Material).toHaveProperty('associations').toBeObject();
  });
  it('should have static methods', () => {
    expectTypeOf(Material).toHaveProperty('initialize').toBeFunction();
    expectTypeOf(Material).toHaveProperty('associate').toBeFunction();
  });
  describe('associations', () => {
    it('should be associated with MaterialUsage', () => {
      Material.associate();
      expectTypeOf(Material).toHaveProperty('associations').toHaveProperty('materialUsage').toEqualTypeOf<Association<Material, MaterialUsage>>();
      expect(Material.hasMany).toBeCalledWith(MaterialUsage, {
        sourceKey: 'materialId',
        foreignKey: 'materialId',
        as: 'materialUsage',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    });
  });
  it('should have instance properties', () => {
    const material = new Material();
    expectTypeOf(material).toHaveProperty('materialId').toBeString();
    expectTypeOf(material).toHaveProperty('vendor').toBeString();
    expectTypeOf(material).toHaveProperty('materialType').toBeString();
    expectTypeOf(material).toHaveProperty('materialDiameter').toBeNumber();
    expectTypeOf(material).toHaveProperty('initialWeight').toBeNumber();
    expectTypeOf(material).toHaveProperty('materialWeight').toBeNumber();
    expectTypeOf(material).toHaveProperty('color').toBeString();

    expectTypeOf(material).toHaveProperty('openedAt').toEqualTypeOf<Date>();
    expectTypeOf(material).toHaveProperty('openedAt').toBeNullable();

    expectTypeOf(material).toHaveProperty('depletedAt').toEqualTypeOf<Date>();
    expectTypeOf(material).toHaveProperty('depletedAt').toBeNullable();

    expectTypeOf(material).toHaveProperty('lastRenewalAt').toEqualTypeOf<Date>();
    expectTypeOf(material).toHaveProperty('lastRenewalAt').toBeNullable();
  });
  describe('virtual fields', () => {
    const material = new Material({
      materialId: '00000000-0000-0000-0000-000000000000',
      vendor: 'FauxFilament',
      materialType: 'FAUX',
      materialDiameter: 1.75,
      initialWeight: 1200,
      materialWeight: 1000,
      color: 'ffffff',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    it('should correctly return "state"', () => {
      expectTypeOf(material).toHaveProperty('state').toBeString();
      expect(material.openedAt).toSatisfy((openedAt) => { return (openedAt ?? null) === null })
      // Open & Depleted IS NULL
      material.openedAt = null;
      material.depletedAt = null;
      expect(material.state).toBe('NEW');
      // Open IS NULL & Depleted IS NOT NULL
      material.openedAt = new Date();
      material.depletedAt = null;
      expect(material.state).toBe('IN_USE');
      // Open IS NOT NULL & Depleted IS NOT NULL
      material.openedAt = new Date();
      material.depletedAt = new Date();
      expect(material.state).toBe('DEPLETED');
    });
  });

  describe('initialization', () => {
    it('should initialize', () => {
      const sequelize = new Sequelize();
      const MaterialInitializeSpy = vi.spyOn(Material, 'initialize');
      Material.initialize(sequelize);
      expect(MaterialInitializeSpy).toHaveBeenCalled();
    });
    describe('validators', () => {
      it.todo('should only allow valid 6 digit HEX color codes');
    });
  });

});
