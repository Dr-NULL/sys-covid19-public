import { Type } from '../fsys';

export abstract class Core<T> {
    private _file: Type.Json<T>;

    private _data: T;
    /**
     * Get or set the data configuration file allocated in memory.
     */
    public get data(): T {
        return this._data;
    }
    public set data(v: T) {
        this._data = v;
    }

    /**
     * Get if the configuration file exists.
     */
    public get exists() {
        return this._file.exists;
    }
    
    /**
     * Create a new File Configuration instance.
     * @param path The path of the configuration file.
     * @param init The default data if doesn't exists.
     */
    public constructor(path: string, init: T) {
        this._file = new Type.Json<T>(path);
        this._data = init;
    }

    /**
     * Load the current configuration file, and storages its data in memory. Accesible with `this.data`
     */
    public async load() {
        this._data = await this._file.read();
    }

    /**
     * Save the current data configuration into the current configuration file. If it doesn\'t exists, creates a new file.
     */
    public save() {
        return this._file.write(this._data);
    }

    /**
     * Delete the current configuration file.
     */
    public delete() {
        return this._file.delete();
    }
}