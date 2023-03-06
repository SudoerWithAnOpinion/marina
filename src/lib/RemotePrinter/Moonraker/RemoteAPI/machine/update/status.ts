export function isUpdateRepositoryStatus(
  input: boolean | SystemUpdateStatus | UpdateRepositoryStatus
): input is UpdateRepositoryStatus {
  if (typeof input === 'boolean') return false;
  return 'remote_version' in input;
}

export type RepoCommits = {
  sha: string;
  author: string;
  date: string;
  subject: string;
  message: string;
  tag: string | null;
};

export function isSystemUpdateStatus(
  input: boolean | SystemUpdateStatus | UpdateRepositoryStatus
): input is SystemUpdateStatus {
  if (typeof input === 'boolean') return false;
  return 'package_count' in input;
}

export type SystemUpdateStatus = {
  package_count: number;
  package_list: string[];
};

export type UpdateRepositoryStatus = {
  branch: string;
  owner: string;
  channel: string;
  commits_behind: RepoCommits[];
  current_hash: string;
  detached: boolean;
  full_version_string: string;
  is_dirty: boolean;
  remote_hash: string;
  remote_version: string;
  repo_name: string;
  version: string;
};

type versionInfo = {
  system: SystemUpdateStatus;
  moonraker: UpdateRepositoryStatus;
  klipper: UpdateRepositoryStatus;
  mainsail?: UpdateRepositoryStatus;
  fluidd?: UpdateRepositoryStatus;
  crowsnest?: UpdateRepositoryStatus;
  sonar?: UpdateRepositoryStatus;
  timelapse?: UpdateRepositoryStatus;
  busy: boolean;
};

export type MachineUpdateStatusAPIResponse = {
  version_info: versionInfo;
};
