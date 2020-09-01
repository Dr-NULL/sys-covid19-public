import { Entity, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Symptom } from './symptom.entity';
import { Form } from './form.entity';
import { BaseOrm } from '../tool/other/base-orm';

@Entity({ name: 'RelFormSymptom' })
export class RelFormSymptom extends BaseOrm {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    
    @ManyToOne(type => Form, ref => ref.relFormSymptom)
    form: Form;
    
    @ManyToOne(type => Symptom, ref => ref.relFormsymptom)
    symptom: Symptom;
}
