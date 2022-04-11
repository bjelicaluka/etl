export class NotExistingPropertyError extends Error {

  constructor(notExistingProperties: string[]) {
    super(`Expected properties that are missing from data record: ${notExistingProperties.join(", ")}.`);
    this.name = "NotExistingPropertyError";
  }

}