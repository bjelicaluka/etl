export class NotValidPropertyTypeError extends Error {

  constructor(notValidProperties: string[]) {
    super(`Properties that have invalid type in data record: ${notValidProperties.join(", ")}.`);
    this.name = "NotValidPropertyTypeError";
  }

}