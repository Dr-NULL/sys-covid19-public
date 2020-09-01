import { Iterator } from './iterator';

export class Rut {
    public static format(input: string): string {
        if (!input) {
            input = '';
        }

        input = input
            .replace(/[^0-9k]/gi, '')
            .replace(/^0+/gi, '')
            .toLowerCase();

        const arr = input.split('').reverse();
        let out = '';
        for (let i = 0; i < arr.length; i++) {
            if (i === 0) {
                out = `-${arr[i]}`;

            } else if ((i % 3 === 0) && (i < (arr.length - 1))) {
                out = `.${arr[i]}${out}`;
            } else {
                out = `${arr[i]}${out}`;
            }
        }

        return out;
    }

    public static isValid(input: string): boolean {
        // Rechazar cadenas vacías
        if (!input) {
            return false;
        }

        const raw = input
            .toLowerCase()
            .replace(/[^0-9k]/gi, '')
            .replace(/^0+/gi, '')
            .split('')
            .reverse();

        if (raw.length === 0) {
            return false;
        }

        // Inicialización
        const serie = new Iterator(2, 3, 4, 5, 6, 7);
        let acum = 0;

        // Sumar serie de multiplicaciones
        const end = raw.shift();
        for (const char of raw) {
            const num = parseInt(char, 10);
            acum += num * serie.next();
        }

        // Calc Mod 11
        const done = 11 - (acum % 11);
        let verif: string;
        switch (done) {
            case 11:
                verif = '0';
                break;
            case 10:
                verif = 'k';
                break;
            default:
                verif = String(done);
                break;
        }

        // Return result
        if (verif === end) {
            return true;
        } else {
            return false;
        }
    }
}
