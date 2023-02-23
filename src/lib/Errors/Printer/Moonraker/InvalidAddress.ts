export default class InvalidAddress extends Error {
  constructor(message:string) {
    super(message);
    Object.setPrototypeOf(this, InvalidAddress.prototype)
  }
}