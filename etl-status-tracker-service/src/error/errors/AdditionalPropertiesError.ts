export class AdditionalPropertiesError extends Error {

  constructor(additionalProperties: string[]) {
    super(`Additional properties that are in data record: ${additionalProperties.join(", ")}.`);
    this.name = "AdditionalPropertiesError";
  }

}