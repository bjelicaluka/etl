import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INamespaceProvider } from "isobarot";
import { IController } from "../contracts/IController";

@injectable()
export class NamespaceController implements IController {

  constructor(
    @inject("INamespaceProvider") private namespaceProvider: INamespaceProvider
  ) {}

  async createNamespace(request: Request, response: Response, next: NextFunction): Promise<any> {
    const { namespace } = request.body;

    this.namespaceProvider.createNamespaceIfNotExists(namespace);
    
    response.sendStatus(200);
  }

}