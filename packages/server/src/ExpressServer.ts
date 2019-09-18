import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import auth from './api/auth';
import profile from './api/profile';
import { addServicesToRequest } from './middlewares/ServiceDependenciesMiddleware';
import { RequestServices } from './types/CustomRequest';

/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer {
  private server?: Express;
  private httpServer?: Server;

  constructor(private requestServices: RequestServices) {}

  public async setup(port: number) {
    const server = express();
    this.setupStandardMiddlewares(server);
    this.setupServiceDependencies(server);
    this.configureApiEndpoints(server);
    this.handleErrors(server);

    this.httpServer = this.listen(server, port);
    this.server = server;

    return this.server;
  }

  public listen(server: Express, port: number) {
    return server.listen(port);
  }

  public kill() {
    if (this.httpServer) this.httpServer.close();
  }

  private setupStandardMiddlewares(server: Express) {
    server.use(express.json());
    server.use(helmet());
    server.use(
      cors({
        credentials: true,
        origin: true
      })
    );
    server.use(cookieParser());
    server.use(compress());
  }

  private setupServiceDependencies(server: Express) {
    const servicesMiddleware = addServicesToRequest(this.requestServices);
    server.use(servicesMiddleware);
  }

  private configureApiEndpoints(server: Express) {
    server.use('/api/auth', auth);
    server.use('/api/profile', profile);
  }

  private handleErrors(server: Express) {
    server.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error(JSON.stringify(err));
      if (err) {
        console.error(err.message);
        res
          .status(err.status || err.output.statusCode || 500)
          .json(
            err.data
              ? { type: 'error', message: err.message, data: err.data.inner }
              : { type: 'error', message: err.message, data: [] }
          );
      }
    });
  }
}
