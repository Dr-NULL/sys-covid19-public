import { BaseEntity, Connection, createConnections } from 'typeorm';

/**
 * Wrapper of BaseEntity of TypeORM. Can manage multiple connections and search by itself the corresponding
 * connection for each Entity if the name is specified.
 */
export abstract class BaseOrm extends BaseEntity {
    private static readonly connections: Connection[] = [];

    /**
     * Connect to all databases configured in your `'ormconfig.json'`.
     */
    public static async connect() {
        const conn = await createConnections();
        conn.forEach(item => {
            this.connections.push(item);
        });
    }

    /**
     * Close all working connections.
     */
    public static async disconnect() {
        while (this.connections.length > 0) {
            const conn = this.connections.shift();
            await conn.close();
        }
    }
    
    /**
     * Set an specific connection name in case the project has multiple named connections.
     */
    public static connectionName?: string;

    /**
     * Get the current Entity's repository.
     */
    static getRepository<T extends BaseEntity>() {
        if (this.connectionName) {
            const conn = this.connections.find(x => x.name === this.connectionName);
            super.useConnection(conn);
        }
        
        return super.getRepository<T>();
    }
}
