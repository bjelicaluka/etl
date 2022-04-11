import { IController } from './contracts/IController';
import { NamespaceRoutes } from "./routes/NamespaceRoutes";
import { ValidationChain } from 'express-validator';

export interface Routes {
    controller: IController;
    routes: Route[];
}

export interface Route {
    method: string;
    route: string;
    action: string;
    roles?: string[];
    middleware?: Function[];
    validations?: ValidationChain[];
};

export const Routes: Routes[] = [
    NamespaceRoutes,
];