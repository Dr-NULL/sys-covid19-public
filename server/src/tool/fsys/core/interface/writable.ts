export interface Writable<T> {
  write: (data: T) => Promise<void>;
}
