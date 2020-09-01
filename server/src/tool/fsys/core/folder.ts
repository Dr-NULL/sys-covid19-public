import * as asyncFs from './async-fs';
import * as int from './interface';
import { Base } from './base';
import { join } from 'path';

export class Folder extends Base {
    public get parent() {
        return new Folder(join(this._path, '..'));
    }

    public get children(): Promise<int.Child[]> {
        return new Promise<int.Child[]>(async (resolve, reject) => {
            try {
                const resp = await asyncFs.readdir(`${this._path}/`);
                const data: int.Child[] = [];

                for (const item of resp) {
                    data.push({
                        isFile: item.isFile(),
                        isFolder: item.isDirectory(),
                        path: this._path + '/' + item.name
                    });
                }

                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Create a new Folder instance.
     * @param path The path of the current element. If begins with a dot, will be parsed has a relative cwd path. 
     * If the path starts with `'/'`, this path will be an absolute path relative to the current drive where the 
     * proyect is mounted.
     */
    public constructor(path?: string) {
        super(path);
    }

    /**
     * Create a copy of the current element. Returns a new instance with the destination path.
     * @param path The path of the current element. If begins with a dot, will be parsed has a relative cwd path. 
     * If the path starts with `'/'`, this path will be an absolute path relative to the current drive where the 
     * proyect is mounted.
     */
    public async copy(path: string) {
        const cons = Object.getPrototypeOf(this).constructor;
        const dest = new cons(path);
        await asyncFs.copy(this._path, dest.path);
        return dest as this;
    }


    /**
     * Move the current element to another path.
     * @param path The path of the current element. If begins with a dot, will be parsed has a relative cwd path. 
     * If the path starts with `'/'`, this path will be an absolute path relative to the current drive where the 
     * proyect is mounted.
     */
    public async move(path: string) {
        const dest = new Folder(path);
        await asyncFs.copy(this._path, dest.path);
        await asyncFs.rmdir(this._path);
        this._path = dest.path;
    }
}