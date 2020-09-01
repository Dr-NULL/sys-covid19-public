import { Method, ErrorHelper } from '../tool/server';
import { UserCtrl } from '../ctrl-app/user-ctrl';

export const userDel = new Method.Delete();
userDel.path = 'user/del/:id';
userDel.callback = async (req, res) => {
    if (!req.session.current) {
        throw new ErrorHelper(401, 'Necesita iniciar sesión para poder eliminar a un usuario');
    }
    
    const selfId = req.session.current.getData() as number;
    const self = await UserCtrl.get(selfId);
    if (!self) {
        throw new ErrorHelper(400, 'El usuario actual es inválido, vuelva a iniciar sesión y reintente.');
    }

    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        throw new ErrorHelper(400, 'El ID entregado debe de ser del tipo numérico');
    }

    const user = await UserCtrl.get(id)
    if (!user) {
        throw new ErrorHelper(404, 'El usuario que se intenta eliminar no existe.');
    } else if (user.typeUser.restrictions <= self.typeUser.restrictions) {
        throw new ErrorHelper(403, 'Usted no posee los privilegios para eliminar a este ususario.');
    }

    await user.remove();
    res.helper.json(null);
};
