type MoonrakerComponents = string | 
"klippy_connection" | "application" | "websockets" |
"internal_transport" | "dbus_manager" | "database" |
"file_manager" |"klippy_apis" |"secrets" |"template" |
"shell_command" | "machine" | "data_store" | "proc_stats" |
"job_state" | "job_queue" | "http_client" | "announcements" |
"webcam" | "extensions" | "authorization" | "octoprint_compat" |
"history" | "update_manager" | "timelapse";

export type ServerInfoAPIResponse = {
  klippy_connected: boolean;
  klippy_state: string | 'ready';
  components: MoonrakerComponents[];
  failed_components: MoonrakerComponents[];
  registered_directories: string[];
  warnings: string[];
  websocket_count: number;
  moonraker_version: string;
  api_version: number[];
  api_version_string: string;
}