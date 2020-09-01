import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseOrm } from '../tool/other/base-orm';
import { User } from './user.entity';
import { RelTypeUserMenu } from './rel-type-user-menu.entity';

@Entity({ name: 'TypeUser' })
export class TypeUser extends BaseOrm {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    /**
     * Nivel de acceso en cuentas de usuarios, contra más cerca del 0, menos restricciones. 
     * El usuario system debería tener nivel "0". Este campo determina la jerarquía entre 
     * tipos de usuarios, estableciendo a qué usuarios puede editar.
     */
    @Column({ type: 'tinyint' })
    restrictions: number;

    @Column({ type: 'varchar', length: 20 })
    descript: string;

    @OneToMany(type => User, ref => ref.typeUser)
    users: User[];

    @OneToMany(type => RelTypeUserMenu, ref => ref.typeUser)
    relTypeUserMenu: RelTypeUserMenu[];
}
