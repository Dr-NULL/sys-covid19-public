import * as fs from 'fs';

/**
 * Make a new folder in the path given.
 * @param path Path of the directory do you want to create.
 * @param options A few Options to the execution (default recursive enabled).
 */
export function mkdir(path: string, options?: fs.MakeDirectoryOptions) {
    return new Promise<string>((resolve, reject) => {
        if (!options) {
            options = { recursive: true };
        }

        fs.mkdir(path, options, (fail, path) => {
            if (fail) {
                reject(fail);
            } else {
                resolve(path);
            }
        });
    });
}
