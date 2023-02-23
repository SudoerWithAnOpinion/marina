export default class NoMoonrakerConnection extends Error {
  constructor(message:string) {
    super(message);
    Object.setPrototypeOf(this, NoMoonrakerConnection.prototype)
  }
}