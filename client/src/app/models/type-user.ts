import { User } from './user';
import { RelTypeUserMenu } from './rel-type-user-menu';

export class TypeUser {
    id: number;
    /**
     * Nivel de acceso en cuentas de usuarios, contra más cerca del 0, menos restricciones.
     * El usuario system debería tener nivel "0". Este campo determina la jerarquía entre
     * tipos de usuarios, estableciendo a qué usuarios puede editar.
     */
    restrictions: number;
    descript: string;
    users: User[];
    relTypeUserMenu: RelTypeUserMenu[];
}
