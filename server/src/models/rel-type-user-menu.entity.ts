import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseOrm } from '../tool/other/base-orm';

import { TypeUser } from './type-user.entity';
import { Menu } from './menu.entity';

@Entity({ name: 'RelTypeUserMenu' })
export class RelTypeUserMenu extends BaseOrm {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    
    @ManyToOne(type => TypeUser, ref => ref.relTypeUserMenu)
    typeUser: TypeUser;
    
    @ManyToOne(type => Menu)
    menu: Menu;
}
