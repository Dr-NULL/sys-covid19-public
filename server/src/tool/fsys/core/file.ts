import { Folder } from './folder';
import { Base } from './base';
import { join } from 'path';
import * as AsyncFs from './async-fs';

export class File extends Base {
    public get parent() {
        return new Folder(join(this._path, '..'));
    }

    /**
     * Create a new File instance.
     * @param path The path of the current element. If begins with a dot, will be parsed has a relative cwd path. 
     * If the path starts with `'/'`, this path will be an absolute path relative to the current drive where the 
     * proyect is mounted.
     */
    public constructor(path: string) {
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
        await AsyncFs.copy(this._path, dest.path);
        return dest as this;
    }

    /**
     * Move the current element to another path.
     * @param path The path of the current element. If begins with a dot, will be parsed has a relative cwd path. 
     * If the path starts with `'/'`, this path will be an absolute path relative to the current drive where the 
     * proyect is mounted.
     */
    public async move(path: string) {
        const dest = new File(path);
        await AsyncFs.copy(this.path, dest.path);
        await AsyncFs.unlink(this._path);
        this._path = dest.path;
    }
}