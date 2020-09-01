export interface FormData {
    /**
     * RUT del trabajador.
     */
    rut: string;

    /**
     * ¿Ha estado en contacto con persona enferma o sospechosa de COVID-19?
     * - `true`  = Sí.
     * - `false` = No.
     * - `null`  = No sabe.
     */
    question01: null | boolean;

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
     * Medio de transporte usado por el trabajador.
     */
    vehicleId: number;

    /**
     * Síntomas presentes en el trabajador
     */
    symptomsIds: number[];
}
