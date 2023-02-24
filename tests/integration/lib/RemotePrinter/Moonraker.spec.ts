/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect, it } from 'vitest';

const testingPrinterDefined = (process.env.TESTING_PRINTER_ADDRESS !== undefined);

import RemoteMoonrakerPrinter from '$lib/RemotePrinter/Moonraker';

describe('Moonraker Remote Printer', ()=>{
  // This has not been tested, may need re-work; this must be run against a real printer.
  it.runIf(testingPrinterDefined)('should connect', async () => {
    const printer = new RemoteMoonrakerPrinter(process.env.TESTING_PRINTER_ADDRESS!);
    const printerReachable = (printer).testConnection();
    expect(printerReachable).resolves.toBe(true);    
  });
})