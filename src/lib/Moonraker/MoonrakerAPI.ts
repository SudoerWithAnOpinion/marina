export default class MoonrakerAPI {
  public printerURL: string
  public objectsAvailable?: Partial<PrinterObjectsNames>

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
      this.objectsAvailable = json.result.objects;
      return this;
    }).catch((err) => {
      throw new Error(err);
    });
  }

  /** 
   * Get Available Printer Objects
   * Automatically fetches object list if not already fetched
   */
  public async getAvailableObjects(): Promise<Partial<PrinterObjectsNames>> {
    if (this.objectsAvailable === undefined) {
      await this.fetchObjects();
    }
    return this.objectsAvailable as Partial<PrinterObjectsNames>;
  }

  /**
   * Query Printer Object(s)
   * Automatically fetches objects list if not already fetched
   */
  public async queryObjects(objects?: string[]): Promise<Record<string, unknown>> {
    if (this.objectsAvailable === undefined) {
      await this.fetchObjects();
    }
    // Determine objects to query, or all if none specified
    if (objects === undefined) {
      objects = Object.keys(this.objectsAvailable as PrinterObjectsNames);
    } else {
      // Remove any objects that are not available
      objects = objects.filter((object) => {
        return this.objectsAvailable?.includes(object);
      });
    }

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
      return json.result as Record<string, unknown>;
    }).catch((err) => {
      throw new Error(err);
    });
  }
}