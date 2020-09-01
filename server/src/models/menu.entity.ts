import { Entity, Tree, PrimaryGeneratedColumn, Column, TreeChildren, TreeParent, OneToMany } from 'typeorm';
import { BaseOrm } from '../tool/other/base-orm';
import { RelTypeUserMenu } from './rel-type-user-menu.entity';

@Entity({ name: 'Menu' })
@Tree('materialized-path')
export class Menu extends BaseOrm {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    
    /**
     * Nombre que mostrarpa el elemento.
     */
    @Column({ type: 'varchar', length: 50 })
    text: string;
    
    /**
     * HTML con el ícono a usar.
     */
    @Column({ type: 'varchar', length: 50 })
    icon: string;
    
    /**
     * URL a la que apunta el elemento.
     */
    @Column({ type: 'varchar', length: 100, nullable: true })
    path: string;

    /**
     * Determina si el elemento debe ser accesible para todos, independiente de si estén logeados o no.
     */
    @Column({ type: 'bit' })
    everyone: boolean;

    @TreeChildren()
    children: Menu[];

    @TreeParent()
    parent: Menu;

    /**
     * Determina en qué casos debe mostrarse un elemento. Si tiene alguna relación con algún tipo de usuario, 
     * solo se mostrará en caso de que el usuario esté logeado y con el rol correspondiente. En caso contrario, 
     * solo será mostrado para quienes no estén logeados.
     */
    @OneToMany(type => RelTypeUserMenu, ref => ref.menu)
    relTypeUserMenu: RelTypeUserMenu[];
}
