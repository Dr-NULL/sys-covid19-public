import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Form } from './form.entity';
import { BaseOrm } from '../tool/other/base-orm';

@Entity({ name: 'Vehicle' })
export class Vehicle extends BaseOrm {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 50 })
    descript: string;

    @OneToMany(type => Form, ref => ref.vehicle)
    forms: Form[];
}