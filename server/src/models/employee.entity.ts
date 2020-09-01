import { PrimaryGeneratedColumn, Column, Entity, OneToMany, BaseEntity } from 'typeorm';
import { Form } from './form.entity';
import { BaseOrm } from '../tool/other/base-orm';

@Entity({ name: 'Employee' })
export class Employee extends BaseOrm {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    
    @Column({ type: 'varchar', length: 12 })
    rut: string;
    
    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({ type: 'varchar', length: 50 })
    position: string;

    @Column({ type: 'bit' })
    isInternal: boolean;

    @OneToMany(type => Form, ref => ref.employee)
    forms: Form[];
}