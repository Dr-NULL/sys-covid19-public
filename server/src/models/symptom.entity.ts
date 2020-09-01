import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RelFormSymptom } from './rel-form-symptom.entity';
import { BaseOrm } from '../tool/other/base-orm';

@Entity({ name: 'Symptom' })
export class Symptom extends BaseOrm {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 50 })
    descript: string;

    @Column({ type: 'bit', nullable: true })
    isValid: boolean;

    @OneToMany(type => RelFormSymptom, ref => ref.symptom)
    relFormsymptom: RelFormSymptom[];
}