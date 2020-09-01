import { Method, ErrorHelper } from '../tool/server';
import { TypeUser } from '../models/type-user.entity';
import { MoreThan } from 'typeorm';
import { UserCtrl } from '../ctrl-app/user-ctrl';

export const typeUserGet = new Method.Get;
typeUserGet.path = 'type-user/get';
typeUserGet.callback = async (req, res) => {
    if (!req.session.current) {
        throw new ErrorHelper(401, 'Necesita de iniciar sesión para obtener esta información.');
    }

    const id = req.session.current.getData() as number;
    const user = await UserCtrl.get(id);
    if (!user) {
        throw new ErrorHelper(401, 'Usuario inválido.');
    }

    const data = await TypeUser.find({
        where: {
            restrictions: MoreThan(user.typeUser.restrictions)
        }
    });
    res.helper.json(data);
};
