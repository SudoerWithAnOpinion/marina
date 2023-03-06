import type { PageServerLoad } from './$types';
import type { UpdateCheckResult } from '$lib/RemotePrinter/RemotePrinter';
import { Printer } from '$models';

export const load: PageServerLoad = async ({ params }) => {
  const printer = await Printer.findByPk(params.id)
    .then((printer) => {
      if (!printer) throw new Error('Invalid printer id');
      return printer;
    })
    .catch((err) => {
      return null;
    });

  let remoteConnection: Promise<boolean>;
  let updatesAvailable: Promise<UpdateCheckResult | null>;
  if (printer !== null) {
    const remotePrinterConnection = printer.setupRemoteConnection();

    remoteConnection = new Promise((resolve) => {
      resolve(remotePrinterConnection.testConnection());
    });

    updatesAvailable = new Promise((resolve) => {
      console.log(`Updates Check Promise Running`);
      resolve(remotePrinterConnection.checkForUpdates());
    });
  } else {
    remoteConnection = new Promise((resolve) => resolve(false));
    updatesAvailable = new Promise((resolve) => resolve(null));
  }

  return {
    printer: printer == null ? null : printer.toJSON(),
    remote: {
      connectionAvailable: remoteConnection,
      updatesAvailable: updatesAvailable
    }
  };
};
