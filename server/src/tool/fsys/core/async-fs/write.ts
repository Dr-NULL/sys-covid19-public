import * as fs from 'fs';

export function write(path: string, data: Buffer, options?: fs.WriteFileOptions) {
    return new Promise<void>((resolve, reject) => {
        if (!options) {
            options = { encoding: 'utf-8' };
        }

        fs.writeFile(path, data, options, (fail) => {
            if (fail) {
                reject(fail);
            } else {
                resolve();
            }
        });
    });
};
