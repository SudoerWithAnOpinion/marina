type TmcStepperDrivers = 'tmc2208' | 'tmc2209' | 'tmc2130' | 'tmc2660' | 'tmc5160';
type McpStepperDrivers = 'mcp4451' | 'mcp4728' | 'mcp4018';
type StepperDrivers = 'a4988' | McpStepperDrivers | TmcStepperDrivers;

type XYZEarray = [
  /** X */
  number,
  /** Y */
  number,
  /** Z */
  number,
  /** E */
  number
];

type StaticPrinterObjects = {
  /** 
   * The webhooks object contains the current printer state and the current state message. 
   * These fields match those returned via the /printer/info endpoint.
   */
  webhooks: {
    state: 'startup' | 'ready' | 'shutdown' | 'error',
    state_message: string
  },
  /** The configfile object reports printer configuration state */
  configfile: {
    /** This is an object containing the configuration as read from printer.cfg. Each config section will be an object containing the configured options. Values will ALWAYS be reported as strings. Note that default values are not reported, only options configured in printer.cfg are present. */
    config: object,
    /** Similar to config, however this object includes default values that may not have been included in printer.cfg. It is possible for a value to be a string, integer, boolean, or float. */
    settings: object,
    /** True if the printer has taken an action which has updated the internal configuration (ie: PID calibration, probe calibration, bed mesh calibration). This allows clients to present the user with the option to execute a SAVE_CONFIG gcode which will save the configuration to printer.cfg and restart the Klippy Host. */
    save_config_pending: boolean,
  },
  mcu: {
    mcu_version: string,
    mcu_build_version: string,
    /** TODO: Narrow Types */
    mcu_constants: Record<string, string>,
    /** TODO:  Narrow Types */
    last_stats: Record<string, string>,
  },
  /** The gcode_move object reports the current gcode state */
  gcode_move: {
    /** AKA "feedrate", this is the current speed multiplier */
    speed_factor: number,
    /** The current gcode speed in mm/s. */
    speed: number,
    /** AKA "extrusion multiplier". */
    extrude_factor: number,
    /** true if the machine axes are moved using absolute coordinates, false if using relative coordinates. */
    absolute_coordinates: boolean,
    /** true if the extruder is moved using absolute coordinates, false if using relative coordinates. */
    absolute_extrude: false,
    /** [X, Y, Z, E] - returns the "gcode offset" applied to each axis. For example, the "Z" axis can be checked to determine how much offset has been applied via "babystepping". */
    homing_origin: XYZEarray,
    /** [X, Y, Z, E] - The internal gcode position, including any offsets (gcode_offset, G92, etc) added to an axis. */
    position: XYZEarray,
    /** [X, Y, Z, E] - The current gcode position sans any offsets applied. For X, Y, and Z, this should match the most recent "G1" or "G0" processed assuming the machine is using absolute coordinates. */
    gcode_position: XYZEarray
  },
  print_stats: {
    /** The filename being printed */
    filename: string,
    /** The total time (in seconds) elapsed since a print has started. This includes time spent paused. */
    total_duration: number,
    /** The total time spent printing (in seconds). This is equivalent to total_duration - time paused. */
    print_duration: number,
    /** The amount of filament used during the current print (in mm). Any extrusion during a pause is excluded. */
    filament_used: number,
    /** 
     * Current print state. Can be one of the following values: 
     *  "standby" "printing" "paused" "complete" "cancelled" "error"
     * Note that if an error is detected the print will abort 
     */
    state: 'standby' | 'printing' | 'paused' | 'complete' | 'cancelled' | 'error',
    /** If an error is detected, this field contains the error message generated. Otherwise it will be a null string. */
    message: string,
  },
  /**
   * The print_stats object reports virtual_sdcard print state
   * Enabled when [virtual_sdcard] is included in printer.cfg
   * After a print has started all of the values will persist until the user issues a SDCARD_RESET_FILE gcode or when a new print has started.
   */
  virtual_sdcard?: {
    /** 
     * The name of the current file loaded. This will be a null string if no file is loaded. 
     * Note that name is a path relative to the gcode folder, thus if the file is located in a subdirectory it would be reported as "my_sub_dir/myprint.gcode".
     */
    filename: string,
    /** The total time (in seconds) elapsed since a print has started. This includes time spent paused. */
    total_duration: number,
    /** The total time spent printing (in seconds). This is equivalent to total_duration - time paused. */
    print_duration: number,
    /** The amount of filament used during the current print (in mm). Any extrusion during a pause is excluded. */
    filament_used: number,
    /** 
     * Current print state. Can be one of the following values: 
     *  "standby" "printing" "paused" "complete" "cancelled" "error"
     * Note that if an error is detected the print will abort 
     */
    state: 'standby' | 'printing' | 'paused' | 'complete' | 'cancelled' | 'error',
    /** If an error is detected, this field contains the error message generated. Otherwise it will be a null string. */
    message: string,
  },
  pause_resume: any,
  /**
   * The display_status object contains state typically used to update displays
   * Enabled when [display] or [display_status] is included in printer.cfg
   */
  display_status?: {
    /** The message set by a M117 gcode. If no message is set this will be a null string. */
    message: string,
    /** 
     * The percentage of print progress, as reported by M73. This will be in the range of 0.0 - 1.0. 
     * If no M73 has been issued this value will fallback to the eqivalent of virtual_sdcard.progress. 
     * Note that progress updated via M73 has a timeout. If no M73 is received after 5 seconds, progress will be set to the fallback value.
     */
    progress: number,
  },
  menu: any,
  probe: any,
  /** 
   * Enabled when [bed_mesh] is included in printer.cfg.
   */
  bed_mesh?: {
    /** 
     * The name of the currently loaded profile. 
     * If no profile is loaded then this will report a null string. 
     * If the user is not using bed_mesh profile management then this will report default after mesh calibration completes.
     */
    profile_name: string | null,
    /**  */
    mesh_min: [number, number],
    /**  */
    mesh_max: [number, number],
    /** A 2 dimensional array representing the matrix of probed values. If the matrix has not been probed the the result is [[]]. */
    probed_matrix: number[][],
    /** A 2 dimension array representing the interpolated mesh. If no matrix has been generated the result is [[]]. */
    mesh_matrix: number[][],
  },
  heaters: any,
  /**
   * The heater_bed object reports state of the heated bed
   * Enabled when [heater_bed] is included in printer.cfg
   */
  heater_bed?: {
    /** The bed's current temperature (in C). */
    temperature: number,
    /** The bed's target temperature (in C). */
    target: number,
    /** The bed's current power level (0.0 - 1.0). */
    power: number,
  },
  /**
   * The fan object returns state of the part cooling fan
   * Enabled when [fan] is included in printer.cfg
   */
  fan?: {
    /** The current fan speed. This is reported as a percentage of maximum speed in the range of 0.0 - 1.0. */
    speed: number,
    /** The fan's revolutions per minute if the tachometer pin has been configured. Will report null if no tach has been configured. */
    rpm: number | null,
  },
  firmware_retraction: any,
  exclude_object: any,
  motion_report: any,
  query_endstops: any,
  /** The idle_timeout object reports the idle state of the printer */
  idle_timeout: {
    /**
     * Can be Idle, Ready, or Printing. 
     * The printer will transition to the Printing state whenever a gcode is issued that commands the tool, this includes manual commands. 
     * Thus this should not be used to determine if a gcode file print is in progress. It can however be used to determine if the printer is busy
     */
    state: 'Idle' | 'Ready' | 'Printing',
    /** 
     * The amount of time the printer has been in the Printing state. 
     * This is reset to 0 whenever the printer transitions from Printing to Ready 
     */
    print_time: number,
  },
  system_stats: any,
  manual_probe: any,
  /** The toolhead object reports state of the current tool */
  toolhead: {
    /** a string containing the axes that are homed. If no axes are homed, returns a null string. */
    homed_axes: 'x' | 'y' | 'z' | 'xy' | 'xz' | 'yz' | 'xyz' | '',
    /** internal value, not generally useful for clients */
    print_time: number,
    /** internal value, not generally useful for clients. */
    estimated_print_time: number,
    /** the name of the currently selected extruder, ie "extruder" or "extruder1". */
    extruder: string, // TODO: Type this for extruder names ('extruder', 'extruder1', etc)
    /** [X, Y, Z, E] - This the the last position toward which the tool was commanded to move. It includes any offsets applied via gcode as well as any transforms made by modules such as "bed_mesh", "bed_tilt", or "skew_correction". */
    position: XYZEarray,
    /** The currently set maximum velocity of the tool (mm/s^2). */
    max_velocity: number,
    /** The currently set maximum acceleration of the tool (mm/s^2). */
    max_accel: number,
    /** The currently set maximum accel to decel of the tool. This value is the maximum rate at which the tool can transition from acceleration to deceleration (mm/s^2). */
    max_accel_to_decel: number,
    /** The currently set square corner velocity. This is the maximum velocity at which the tool may travel a 90 degree corner. */
    square_corner_velocity: number,
  },
  /** 
   * The extruder object reports state of an extruder
   * Enabled when [extruder] is included in printer.cfg
   * If multiple extruders are configured, extruder 0 is available as extruder, extruder 1 as extruder1 and so on.
   */
  extruder?: {
    /** The extruder's current temperature (in C). */
    temperature: number,
    /** The extruder's target temperature (in C). */
    target: number,
    /** The current pwm value applied to the heater. This value is expressed as a percentage from 0.0 to 1.0. */
    power: number,
    /** The extruder's current pressure advance value. */
    pressure_advance: number,
    /** The currently set time range to use when calculating the average extruder velocity for pressure advance. */
    smooth_time: number,
  },
};

/**
 * Define the Printer Object Names that have a prefix
 * 
 * This is for objects such as fans, output pins, etc.
 */
type PrinterObjectsNamePrefixes = {
  /** 
   * Gcode macros will report the state of configured variables
   * Enabled when [gcode_macro macro_name] is included in printer.cfg. It is possible for multiple gcode macros to be configured. 
   */
  gcode_macro?: object,
  /** Enabled when [output_pin pin_name] is included in printer.cfg. It is possible for multiple output pins to be configured. */
  output_pin?: {
    /** The currently set value of the pin, in the range of 0.0 - 1.0. A digital pin will always be 0 or 1, whereas a pwm pin may report a value across the entire range. */
    value: number,
  },
  heater_fan?: object,
  extruder?: object,
  /** Enabled when [temperature_sensor sensor_name] is included in printer.cfg. It is possible for multiple temperature sensors to be configured. */
  temperature_sensor?: {
    /** Sensor's current reported temperature */
    temperature: number,
    /** The mimimum temperature read from the sensor */
    measured_min_temp: number,
    /** The maximum temperature read from the sensor */
    measured_max_temp: number,
  },
  /**  Enabled when [temperature_fan fan_name] is included in printer.cfg.It is possible for multiple temperature fans to be configured. */
  temperature_fan?: {
    /** Current fan speed as a percentage of maximum speed, reported in the range of 0.0 - 1.0 */
    speed: number,
    /** Currently reported temperature of the sensor associated with the fan */
    temperature: number,
    /** The current target temperature for the temperature_fan */
    target: number,
  },
  /** Enabled when [filament_switch_sensor sensor_name] is included in printer.cfg. It is possible for multiple filament sensors to be configured. */
  filament_switch_sensor?: {
    /** Set to true if the switch detects filament, otherwise false */
    filament_detected: boolean,
    /** Set to true if the sensor is currently enabled, otherwise false */
    enabled: boolean,
  },
};


// WIP: This type works, but isn't very restrictive; it allows any string to be used as a key with any type
type PrinterObjects = StaticPrinterObjects & { [k as string]: any };
type PrinterObjectsNames = keyof PrinterObjects;
