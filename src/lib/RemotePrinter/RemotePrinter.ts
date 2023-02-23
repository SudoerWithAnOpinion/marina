export default interface RemotePrinter {
  connectionType: 'none' | 'moonraker' | 'octoprint';
  
  emergencyStop(): void;
  
  // queryVolume(): Promise<MoonrakerAPIResult.XYZEarray|null>;

}