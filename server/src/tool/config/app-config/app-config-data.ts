export interface AppConfigData {
  folder: {
    [key: string]: string;
    angular: string;
    session: string;
  };
  session: {
    name: string;
    expires: number;
  };
  server: {
    port: number;
    apiPrefix: string;
  };
  mail: {
    host: string;
    port: number;
    user: string;
    pass: string;
  };
  meta: any;
}