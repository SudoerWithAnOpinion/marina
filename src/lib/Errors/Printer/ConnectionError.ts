export default class ConnectionError extends Error {
  constructor(message:string) {
    super(message);
    Object.setPrototypeOf(this, ConnectionError.prototype)
  }
}