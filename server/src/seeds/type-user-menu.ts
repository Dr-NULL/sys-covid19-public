import { RelTypeUserMenu } from '../models/rel-type-user-menu.entity';
import { TypeUser } from '../models/type-user.entity';
import { Menu } from '../models/menu.entity';

export const typeUserMenu = async () => {
    // Tipos de Usuarios
    const typeSys = new TypeUser();
    typeSys.descript = 'System';
    typeSys.restrictions = 0;
    await typeSys.save();

    const typeAdm = new TypeUser();
    typeAdm.descript = 'Administrador';
    typeAdm.restrictions = 1;
    await typeAdm.save();

    const typeEnc = new TypeUser();
    typeEnc.descript = 'Encuestador';
    typeEnc.restrictions = 2;
    await typeEnc.save();

    // Crear menús visibles
    const menuConfigUsers = new Menu();
    menuConfigUsers.icon = 'fas fa-users-cog';
    menuConfigUsers.text = 'Configurar Usuarios';
    menuConfigUsers.path = 'config/users';
    menuConfigUsers.everyone = false;
    await addMenu(menuConfigUsers, typeSys, typeAdm);

    const menuForm = new Menu();
    menuForm.icon = 'fas fa-file-medical-alt';
    menuForm.text = 'Llenar Formulario';
    menuForm.path = 'form'
    menuForm.everyone = false;
    await addMenu(menuForm, typeSys, typeAdm, typeEnc);

    const menuLogin = new Menu();
    menuLogin.icon = 'fas fa-sign-in-alt';
    menuLogin.text = 'Iniciar Sesión';
    menuLogin.path = 'user/login';
    menuLogin.everyone = true;
    await addMenu(menuLogin);

    const menuLogout = new Menu();
    menuLogout.icon = 'fas fa-sign-out-alt';
    menuLogout.text = 'Cerrar Sesión';
    menuLogout.path = 'user/logout';
    menuLogout.everyone = false;
    await addMenu(menuLogout, typeSys, typeAdm, typeEnc); 
};

/**
 * Guarda en DB el menú entregado, y crea las relaciones con los tipos de usuarios entregados.
 */
const addMenu = async (menu: Menu, ...type: TypeUser[]) => {
    await menu.save();
    
    for (const item of type) {
        const rel = new RelTypeUserMenu();
        rel.typeUser = item;
        rel.menu = menu;
        await rel.save();
    }
};
