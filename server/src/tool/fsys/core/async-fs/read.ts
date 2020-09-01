import * as fs from 'fs';

/**
 * Read a file, and return the data as a Buffer.
 * @param path Path of the file to read.
 */
export function read(path: string) {
    return new Promise<Buffer>((resolve, reject) => {
        fs.readFile(path, (fail, data) => {
            if (fail) {
                reject(fail);
            } else {
                resolve(data);
            }
        });
    });
};
