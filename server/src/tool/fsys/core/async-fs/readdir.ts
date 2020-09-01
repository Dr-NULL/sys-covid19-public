import * as fs from 'fs';

export function readdir(path: string) {
    return new Promise<fs.Dirent[]>((resolve, reject) => {
        fs.readdir(
            path,
            {
                encoding: 'utf-8',
                withFileTypes: true
            },
            (fail, data) => {
                if (fail) {
                    reject(fail);
                } else {
                    resolve(data);
                }
            }
        );
    });
}
