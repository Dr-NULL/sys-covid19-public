export interface OrmConfigData {
  name?: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  encrypt: boolean;
  syncronize: boolean;
  logging: boolean;
  entities: string[];
  migrations?: string[];
  cli?: {
    entitiesDir: string;
    migrationsDir: string;
    subscribersDir?: string;
  },
  options: {
    enableArithAbort: boolean;
  }
}