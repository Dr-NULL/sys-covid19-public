import { Vehicle } from './vehicle';
import { Employee } from './employee';
import { RelFormSymptom } from './rel-form-symptom';

export class Form {
    id: number;
    date: string;

    /**
     * ¿Ha estado en contacto con persona enferma o sospechosa de COVID-19?
     * - `true`  = Sí.
     * - `false` = No.
     * - `null`  = No sabe.
     */
    question01: boolean;

    /**
     * ¿Estuvo enfermo/a en los últimos 5 días?
     */
    question02: boolean;

    /**
     * ¿Ha participado de actividades públicas o familiares en los últimos 5 días?
     */
    question03: boolean;

    /**
     * ¿Ha estado en centros de salud como: Consultorios, Hospitales o Clínicas en los últimos 5 días?
     */
    question04: boolean;

    /**
     * ¿Ha viajado fuera de la ciudad durante los últimos 5 días?
     */
    question05: boolean;

    /**
     * ¿Presenta algunos de los siguientes síntomas?
     */
    relFormSymptom: RelFormSymptom[];

    /**
     * Medio de transporte utilizado.
     */
    vehicle: Vehicle;

    /**
     * Empleado entrevistado.
     */
    employee: Employee;
}
