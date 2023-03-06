import MoonrakerRemotePrinter from './Moonraker';

export type UpdateCheckResult = {
  [k: string]:
    | {
        local: string;
        remote: string;
        commits_behind: number;
      }
    | {
        packages: string[];
      };
};
export default interface RemotePrinter {
  connectionType: 'none' | 'moonraker' | 'octoprint';

  testConnection(): Promise<boolean>;

  emergencyStop(): void;
  restart(): void;
  firmwareRestart(): void;

  // queryVolume(): Promise<MoonrakerAPIResult.XYZEarray|null>;

  /**
   * Check for outdated software
   * @param {boolean} refresh - Force the remote printer to perform an online check for updates
   * @returns {Promise<unknown>} - An object containing the results of the update check
   * @returns {Promise<null>} - Null of the printer is unable to check for updates
   */
  checkForUpdates(refresh?: boolean): Promise<UpdateCheckResult | null>;
}

export class RemotePrinterFactory {
  public static createPrinter(
    connectionType: string,
    address: string,
    apiKey?: string
  ): RemotePrinter {
    switch (connectionType) {
      case 'moonraker':
        return new MoonrakerRemotePrinter(address, apiKey);
      case 'octoprint':
        throw new Error('OctoPrint is not yet supported');
      default:
        throw new Error('Invalid connection type');
    }
  }
}
