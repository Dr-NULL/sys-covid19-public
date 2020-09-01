import { ValidatorFn } from '@angular/forms';

/**
 * Validador de nombres de usuario, los cuales:
 * - Deben de tener entre 4 a 20 caracteres de largo.
 * - Solo letras, números, guiones o guiones bajos.
 * - Todo en minúscula.
 * @param ctrl instancia del componente abstracto.
 */
export const nick: ValidatorFn = ctrl => {
    let value = ctrl.value as string;
    if (!value) {
        value = '';
    }

    if (value.length < 4) {
        // Largo menor al esperado
        return {
            length: value.length,
            minLength: 4
        };

    } else if (value.length > 20) {
        // Largo mayor al esperado, recortar
        ctrl.setValue(value.substr(0, 20));
        return null;

    } else if (value.match(/(\s|[^a-z0-9\-_])/g)) {
        // Caracteres inválidos, limpiar
        value = value
            .toLowerCase()
            .replace(/(\s|[^a-z0-9\-_])/gi, '');

        ctrl.setValue(value);
        return null;
    } else {
        return null;
    }
};
