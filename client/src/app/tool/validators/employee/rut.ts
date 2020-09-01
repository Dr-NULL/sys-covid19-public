import { ValidatorFn } from '@angular/forms';
import { Employee } from '@models/employee';
import { Rut } from '../../other/rut';

interface Page {
    employee: Employee;
}

/**
 * Devuleve un validador de RUT que, en caso de que se provea una referencia de componente, también comprobará
 * si coincide este RUT con el RUT de la instancia referenciada en el formulario.
 * @param page Referencia al componente que contiene una instancia referenciada de Employee.
 */
export const rut = (page?: Page): ValidatorFn => {
    return ctrl => {
        let value = ctrl.value as string;
        value = Rut.format(value);

        if (Rut.isValid(value)) {
            if (!page) {
                return null;
            } else if (!page.employee) {
                return { notExist: true };
            } else if (page.employee.rut !== value) {
                return { notEquals: true };
            } else {
                return null;
            }
        } else {
            return { rut: true };
        }
    };
};
