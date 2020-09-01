import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Employee } from './employee.entity';
import { RelFormSymptom } from './rel-form-symptom.entity';
import { BaseOrm } from '../tool/other/base-orm';

@Entity({ name: 'Form' })
export class Form extends BaseOrm {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    date: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    ip: string;

    /**
     * ¿Ha estado en contacto con persona enferma o sospechosa de COVID-19 en los últimos 14 días?
     * - `true`  = Sí.
     * - `false` = No.
     * - `null`  = No sabe.
     */    
    @Column({ type: 'bit', nullable: true })
    question01: boolean;

    /**
     * ¿Estuvo enfermo/a en los últimos 5 días?
     */
    @Column({ type: 'bit' })
    question02: boolean;

    /**
     * ¿Ha participado de actividades públicas o familiares en los últimos 5 días?
     */
    @Column({ type: 'bit' })
    question03: boolean;

    /**
     * ¿Ha estado en centros de salud como: Consultorios, Hospitales o Clínicas en los últimos 5 días?
     */
    @Column({ type: 'bit' })
    question04: boolean;

    /**
     * ¿Ha viajado fuera de la ciudad durante los últimos 5 días?
     */
    @Column({ type: 'bit' })
    question05: boolean;

    /**
     * ¿Presenta algunos de los siguientes síntomas?
     */
    @OneToMany(type => RelFormSymptom, ref => ref.form)
    relFormSymptom: RelFormSymptom[];

    /**
     * Medio de transporte utilizado.
     */
    @ManyToOne(type => Vehicle, ref => ref.forms)
    vehicle: Vehicle;

    /**
     * Empleado entrevistado.
     */
    @ManyToOne(type => Employee, ref => ref.forms)
    employee: Employee;
}