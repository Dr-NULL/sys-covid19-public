import * as asyncFs from './async-fs';
import { join } from 'path';

export abstract class Base {
    protected _path : string;
    /**
     * Get the current path.
     */
    public get path() : string {
        return this._path;
    }

    /**
     * Get the current name.
     */
    public get name() : string {
        const part = this._path
            // .replace(/[\\\/]+$/gi, '')
            .split('/')
            .pop();

        return part;
    }

    /**
     * Get if the current path exists.
     */
    public get exists() {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const stat = await asyncFs.stat(this.path);
                resolve(true);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    resolve(false);
                } else {
                    reject(err);
                }
            }
        })
    }
    
    /**
     * Create a new filesystem instance.
     * @param path The path of the current element. If begins with a dot, will be parsed has a relative cwd path. 
     * If the path starts with `'/'`, this path will be an absolute path relative to the current drive where the 
     * proyect is mounted.
     */
    public constructor(path: string) {        
        // Absolute or Relative
        path = path.trim();
        if (path.length === 0) {
            path = '.';
        }

        // Absolute or relative path
        if (path.match(/(^\.{1,2}$|^\.{1,2}(\\|\/))/gi)) {
            path = join (process.cwd(), path);
        } else {
            path = join (path);
        }

        // Fix last dot
        if (path.match(/(^[^\\\/]+|[\\\/])\.+$/gi)) {
            path = path.replace(/\.+$/gi, '');
        }

        // Normalize
        path = path.replace(/\\/gi, '/');
        path = path.replace(/\/+$/gi, '');
        this._path = path;
    }

    /**
     * Delete the current object from the filesystem.
     */
    public async delete() {
        const stat = await asyncFs.stat(this._path);
        if (stat.isDirectory()) {
            await asyncFs.rmdir(this._path);
        } else if (stat.isFile()) {
            await asyncFs.unlink(this._path);
        } else {
            throw new Error('Path type not supported.');
        }
    }

    public async rename(name: string) {
        // Get new Path
        const part = this._path.split('/');
        part.pop();
        part.push(name.trim());
        const newPath = part.reduce((prev, curr, i) => {
            return (i === 0) ? curr : `${prev}/${curr}`
        });

        // Rename
        await asyncFs.rename(this._path, newPath);
        this._path = newPath;
    }

    // Properties
    /**
     * Get the parent folder of the current element.
     */
    public abstract get parent(): Base;

    // Methods
    /**
     * Create a copy of the current element. Returns a new instance with the destination path.
     * @param path The path of the current element. If begins with a dot, will be parsed has a relative cwd path. 
     * If the path starts with `'/'`, this path will be an absolute path relative to the current drive where the 
     * proyect is mounted.
     */
    public abstract copy(path: string): Promise<Base>;
    /**
     * Move the current element to another path.
     * @param path The path of the current element. If begins with a dot, will be parsed has a relative cwd path. 
     * If the path starts with `'/'`, this path will be an absolute path relative to the current drive where the 
     * proyect is mounted.
     */
    public abstract move(path: string): Promise<void>;
}