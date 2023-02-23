export interface MoonrakerAPIResponse<T> {
  result: T;
}

export interface UpdateRepositoryStatus {
  branch: string,
  owner: string,
  channel: string,
  current_hash: string,
  detached: boolean,
  full_version_string: string;
  is_dirty: boolean,
  remote_hash: string,
  remote_version: string,
  repo_name: string,
  version: string,
}

export default class MoonrakerAPI {
  public printerURL: string
  public objectCache: Partial<MoonrakerAPIResult.PrinterObjects> & { objects: string[] } = { objects: [] };

  constructor(printerURL: string) {
    this.printerURL = printerURL
  }

  /**
   * Fetch Printer Objects
   * This method is called automatically when querying objects
   */
  protected async fetchObjects(): Promise<this> {
    return fetch(`${this.printerURL}/printer/objects/list`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }).then(response => {
      return response.json();
    }).then(json => {
      this.objectCache = json.result.objects;
      return this;
    }).catch((err) => {
      throw new Error(err);
    });
  }

  /** 
   * Get Available Printer Objects
   * Automatically fetches object list if not already fetched
   */
  public async getAvailableObjects(): Promise<string[]> {
    if (this.objectCache.objects.length === 0) {
      await this.fetchObjects();
    }
    return this.objectCache.objects;
  }

  /**
   * Query Printer Object(s)
   * Automatically fetches objects list if not already fetched
   */
  public async queryObjects(objects: string[]): Promise<Record<string, unknown>> {
    if (this.objectCache.objects.length === 0) {
      await this.fetchObjects();
    }
    // Remove any objects that are not available
    objects = objects.filter((object) => {
      return this.objectCache.objects?.includes(object);
    });

    return fetch(`${this.printerURL}/printer/objects/query`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        objects: objects
      }),
    }).then(response => {
      return response.json();
    }).then(json => {
      // Update object cache (new results take precedence)
      this.objectCache = { ...this.objectCache, ...json.result.status };
      return json.result.status as Record<string, unknown>;
    }).catch((err) => {
      throw new Error(err);
    });
  }

  /**
   * Gets Printer Print Volume
   * This is a constant value, so it is only queried automatically once.
   */
  public async getPrintVolume() {
    // Query data if not available
    const requiredObjects = ['stepper_x', 'stepper_y', 'stepper_z'];
    // Verify the required objects are available in the cache, otherwise, query them
    const objsAvail = requiredObjects.every(item => { return Object.keys(this.objectCache).includes(item) });
    if (!objsAvail) {
      await this.queryObjects(requiredObjects);
    }
    // Return print volume
    const printerDimensions = {
      x: {
        max: this.objectCache.configfile?.settings.stepper_x?.position_max as number,
        min: this.objectCache.configfile?.settings.stepper_x?.position_min as number,
      },
      y: {
        max: this.objectCache?.configfile?.settings.stepper_y?.position_max as number,
        min: this.objectCache?.configfile?.settings.stepper_y?.position_min as number,
      },
      z: {
        max: this.objectCache?.configfile?.settings.stepper_z?.position_max as number,
        min: this.objectCache?.configfile?.settings.stepper_z?.position_min as number,
      }
    }
    return {
      ...printerDimensions,
      volume: printerDimensions.x.max * printerDimensions.y.max * printerDimensions.z.max
    }
  }
}