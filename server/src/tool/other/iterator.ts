export class Iterator<T = any> {
    private data: T[] = [];
    private i: number;

    public get index(): number {
        return this.i;
    }

    public get length(): number {
        return this.data.length;
    }

    public get isLast(): boolean {
        if (this.i === (this.data.length - 1)) {
            return true;
        } else {
            return false;
        }
    }

    constructor(...args: T[]) {
        this.data = args;
        this.i = 0;
    }

    next() {
        const value = this.data[this.i];
        if (this.i >= this.data.length - 1) {
            this.i = 0;
        } else {
            this.i++;
        }

        return value;
    }
}
