import * as fs from 'fs';

export function rename(oldPath: string, newPath: string) {
    return new Promise<void>((resolve, reject) => {
        fs.rename(oldPath, newPath, fail => {
            if (fail) {
                reject(fail);
            } else {
                resolve();
            }
        });
    });
}
