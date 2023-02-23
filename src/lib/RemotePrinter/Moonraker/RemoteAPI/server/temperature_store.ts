
interface TemperatureArray {
  temperatures: number[];
  targets?: number[];
  powers?: number[];
  speeds?: number[];
}
export type ServerTemperatureStoreAPIResponse = Record<string, TemperatureArray>;