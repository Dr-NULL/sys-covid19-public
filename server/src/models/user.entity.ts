import { Entity, Unique, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseOrm } from '../tool/other/base-orm';
import { TypeUser } from './type-user.entity';

@Entity({ name: 'User' })
@Unique('unique_rut', [ 'rut' ])
export class User extends BaseOrm {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    
    @Column({ type: 'varchar', length: 9 })
    rut: string;
    
    @Column({ type: 'varchar', length: 20 })
    nick: string;
    
    @Column({ type: 'varchar', length: 512 })
    pass: string;
    
    @Column({ type: 'varchar', length: 100 })
    mail: string;

    @ManyToOne(type => TypeUser, ref => ref.users)
    typeUser: TypeUser;
}
