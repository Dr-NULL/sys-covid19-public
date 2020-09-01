import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

/**
 * Devuelve un validador de contraseñas, el cual verifica si ésta
 * es de un mínimo de 4 caracteres de largo, hasta un máximo de 30.
 * @param strict Si es `true` validará, además del largo:
 * - Al menos un caracter numérico.
 * - Al menos un caracter en mayúsculas.
 * - Al menos un caracter en minúsculas.
 * - Al menos un caracter de otro tipo.
 */
export const pass = (strict?: boolean): ValidatorFn => {
    return ctrl => {
        let value = ctrl.value as string;
        if (!value) {
            value = '';
        }

        // Check Length
        if (value.length < 8) {
            return {
                length: value.length,
                minLength: 8
            };
        } else if (value.length > 30) {
            value = value.substr(0, 30);
            ctrl.setValue(value);
            return null;
        }

        // Check Characters
        if (strict) {
            const error: ValidationErrors = {};
            if (!value.match(/[a-z]/g)) {
                error.noLowerCase = true;
            }
            if (!value.match(/[A-Z]/g)) {
                error.noUpperCase = true;
            }
            if (!value.match(/[0-9]/g)) {
                error.noNumber = true;
            }
            if (!value.match(/[^a-z0-9]/gi)) {
                error.noSymbol = true;
            }
            if (Object.keys(error).length > 0) {
                return error;
            } else {
                return null;
            }
        } else {
            return null;
        }
    };
};
