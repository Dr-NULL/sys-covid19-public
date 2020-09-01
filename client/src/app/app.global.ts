export const appGlobal = {
    http: {
        apiPrefix: 'api',
        headers: {
            'content-type': 'application/vnd.api+json',
            'Access-Control-Allow-Origin': location.origin,
            'Set-Cookie': 'HttpOnly; Secure; SameSite=Strict'
        }
    }
};
