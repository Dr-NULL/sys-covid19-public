import * as fs from 'fs';

export function unlink(path: string) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, fail => {
            if (fail) {
                reject(fail);
            } else {
                resolve(fail);
            }
        });
    });
}
