//import { CatEndpoints } from './cats/CatEndpoints';
//import { CatRepository } from './cats/CatRepository';
//import { CatService } from './cats/CatService';
import { AuthService } from './api/auth/AuthService';
import { ProfileService } from './api/profile/ProfileService';
import { ExpressServer } from './ExpressServer';

/**
 * Wrapper around the Node process, ExpressServer abstraction and complex dependencies such as services that ExpressServer needs.
 * When not using Dependency Injection, can be used as place for wiring together services which are dependencies of ExpressServer.
 */
export class Application {
  public static async createApplication() {
    const authService = new AuthService();
    const profileService = new ProfileService();
    const requestServices = { authService, profileService };
    const expressServer = new ExpressServer(requestServices);

    await expressServer.setup(8000);
    Application.handleExit(expressServer);

    return expressServer;
  }

  private static handleExit(express: ExpressServer) {
    process.on('uncaughtException', (err: Error) => {
      console.error('Uncaught exception', err);
      Application.shutdownProperly(1, express);
    });
    process.on('unhandledRejection', (reason: {} | null | undefined) => {
      console.error('Unhandled Rejection at promise', reason);
      Application.shutdownProperly(2, express);
    });
    process.on('SIGINT', () => {
      console.info('Caught SIGINT');
      Application.shutdownProperly(128 + 2, express);
    });
    process.on('SIGTERM', () => {
      console.info('Caught SIGTERM');
      Application.shutdownProperly(128 + 2, express);
    });
    process.on('exit', () => {
      console.info('Exiting');
    });
  }

  private static shutdownProperly(exitCode: number, express: ExpressServer) {
    Promise.resolve()
      .then(() => express.kill())
      .then(() => {
        console.info('Shutdown complete');
        process.exit(exitCode);
      })
      .catch(err => {
        console.error('Error during shutdown', err);
        process.exit(1);
      });
  }
}
