export interface Readable<T> {
  read: () => Promise<T>;
}
