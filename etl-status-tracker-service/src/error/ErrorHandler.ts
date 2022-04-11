import { Response } from 'express';
import { LOGGING } from '../config';

interface ErrorResponse {
  statusCode: number;
  message: string;
}

const ErrorNameCode = {
  NotExistingPropertyError: 400,
  NotValidPropertyTypeError: 400,
  AdditionalPropertiesError: 400,
  Error: 500,
}

export class ErrorHandler {

  private static response: Response;

  public static forResponse(response: Response) {
    this.response = response;
    return this;
  }

  public static handleError(e: Error): ErrorResponse {
    LOGGING && console.log(`${e.name}: ${e.message}`);
    const errorResponse = {
      statusCode: ErrorNameCode[e.name] || 500,
      message: e.message
    };

    if(this.response)
      this.sendErrorResponse(errorResponse)
    
    this.response = null;
    return errorResponse;
  }

  private static sendErrorResponse(errorResponse: ErrorResponse) {
    this.response.status(errorResponse.statusCode);
    this.response.send({ message: errorResponse.message });
  }

}