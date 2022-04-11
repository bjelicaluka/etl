import 'reflect-metadata'
import express from "express";
import { Application } from 'express';
import { Server } from 'http';
import { Container } from 'inversify';
import { IInstaller } from "./contracts/IInstaller";
import { MiddlewareInstaller } from "./installers/MiddlewareInstaller";
import { DocumentationInstaller } from './installers/DocumentationInstaller';
import { RoutesInstaller } from "./installers/RoutesInstaller";
import { RequestValidationInstaller } from './installers/RequestValidationInstaller';
import { RemoteCacheInstaller } from './installers/RemoteCacheInstaller';
import { WsEventsInstaller } from './installers/WsEventsInstaller';
import { PublisherInstaller } from './installers/PublisherInstaller';
import { NamespaceController } from './controllers/NamespaceController';
import { SubscriberInstaller } from './installers/SubscriberInstaller';
const AppContainer = new Container();

// AppContainer
AppContainer.bind<Container>("AppContainer").toConstantValue(AppContainer);

// Application and Server
AppContainer.bind<Application>("Application").toConstantValue(express());
AppContainer.bind<Server>(Server).toConstantValue(new Server(AppContainer.get<Application>("Application")));

// Installers
AppContainer.bind<IInstaller>("IInstaller").to(RemoteCacheInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(MiddlewareInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(DocumentationInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(RequestValidationInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(WsEventsInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(RoutesInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(PublisherInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(SubscriberInstaller);

// Controllers
AppContainer.bind<NamespaceController>(NamespaceController).toSelf();

export { AppContainer };