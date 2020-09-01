import { Express } from 'express';

/**
 * Action to configure the Express application instance.
 */
export interface Action {
  (app: Express): void | Promise<void>
}