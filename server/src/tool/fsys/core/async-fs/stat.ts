import * as fs from 'fs';

export function stat(path: string) {
    return new Promise<fs.Stats>((resolve, reject) => {
        fs.stat(path, (fail, stat) => {
            if (fail) {
                reject(fail);
            } else {
                resolve(stat);
            }
        });
    });
}
