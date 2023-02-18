import type { MoonrakerAPIResponse, UpdateRepositoryStatus } from '$lib/Moonraker/MoonrakerAPI';

interface MachineUpdateStatusResponse {
  version_info: {
    system: unknown,
    moonraker: UpdateRepositoryStatus,
    klipper: UpdateRepositoryStatus,
    mainsail?: UpdateRepositoryStatus,
    fluidd?: UpdateRepositoryStatus,
    crowsnest?: UpdateRepositoryStatus,
    sonar?: UpdateRepositoryStatus,
    timelapse?: UpdateRepositoryStatus,
  }
}


const getUpdateStatus = async (printerAddress: string, refresh = false, apiKey?: string) => {
  const endpoint = `machine/update/status?refresh=${refresh ? 'true' : 'false'}`;
  return await fetch(printerAddress + endpoint, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  }).then((response) => {
    if (response.ok) {
      const data = response.json() as unknown as MoonrakerAPIResponse<MachineUpdateStatusResponse>;
      return data;
    } else {
      throw new Error(response.statusText);
    }
  });
}


export {
  getUpdateStatus,
}