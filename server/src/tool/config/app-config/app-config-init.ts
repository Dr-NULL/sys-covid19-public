import { AppConfigData } from './app-config-data';

export const appConfigInit: AppConfigData = {
  folder: {
    angular: '../client/dist',
    session: '../data/session'
  },
  session: {
    name: 'i-see-you',
    expires: 30
  },
  server: {
    port: 80,
    apiPrefix: 'api'
  },
  mail: {
    host: null,
    port: null,
    user: null,
    pass: null
  },
  meta: null
}