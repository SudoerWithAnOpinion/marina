import { assert, describe, expect, it, afterEach, expectTypeOf, vi } from 'vitest';

vi.mock('sequelize');
import Printer from '$models/Printers/Printer';

describe('Printer', () => {
  it('should be constructable', () => {
    const printer = new Printer();
    expectTypeOf(printer).toEqualTypeOf<Printer>();
    vi.resetAllMocks();
  });
  it('should have static properties', () => {
    expectTypeOf(Printer).toHaveProperty('initialize').toBeFunction();
    expectTypeOf(Printer).toHaveProperty('associate').toBeFunction();
    expectTypeOf(Printer).toHaveProperty('associations').toHaveProperty('jobs')
  });
  it('should have instance properties', () => {
    const printer = new Printer();
    expectTypeOf(printer).toHaveProperty('printerId').toBeString();
    expectTypeOf(printer).toHaveProperty('name').toBeString();
    expectTypeOf(printer).toHaveProperty('description').toBeString();
    expectTypeOf(printer).toHaveProperty('address').toBeString();
    expectTypeOf(printer).toHaveProperty('volume').toBeString();
  });

});