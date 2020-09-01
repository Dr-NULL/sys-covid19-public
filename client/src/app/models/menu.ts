import { RelTypeUserMenu } from './rel-type-user-menu';

export class Menu {
    id: number;

    /**
     * Nombre que mostrarpa el elemento.
     */
    text: string;

    /**
     * HTML con el ícono a usar.
     */
    icon: string;

    /**
     * URL a la que apunta el elemento.
     */
    path: string;

    /**
     * Determina si el elemento debe ser accesible para todos, independiente de si estén logeados o no.
     */
    everyone: boolean;
    children: Menu[];
    parent: Menu;

    /**
     * Determina en qué casos debe mostrarse un elemento. Si tiene alguna relación con algún tipo de usuario, 
     * solo se mostrará en caso de que el usuario esté logeado y con el rol correspondiente. En caso contrario, 
     * solo será mostrado para quienes no estén logeados.
     */
    relTypeUserMenu: RelTypeUserMenu[];
}
