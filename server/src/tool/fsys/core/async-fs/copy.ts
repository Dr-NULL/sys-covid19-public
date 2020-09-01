import * as fs from 'fs';

export function copy(oldPath: string, newPath: string) {
    return new Promise<void>((resolve, reject) => {
        fs.copyFile(oldPath, newPath, fail => {
            if (fail) {
                reject(fail);
            } else {
                resolve();
            }
        });
    });
}
