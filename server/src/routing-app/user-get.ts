import { Method, ErrorHelper } from '../tool/server';
import { UserCtrl } from '../ctrl-app/user-ctrl';
import { User } from '../models/user.entity';
import { TypeUser } from '../models/type-user.entity';
import { MoreThan } from 'typeorm';
import { Rut } from '../tool/other/rut';

export const userGet = new Method.Get();
userGet.path = 'user/get';
userGet.callback = async (req, res) => {
    if (!req.session.current) {
        throw new ErrorHelper(401, 'Necesita de iniciar sesión para obtener esta información.');
    }

    const id = req.session.current.getData() as number;
    const user = await UserCtrl.get(id);
    if (!user) {
        throw new ErrorHelper(401, 'Usuario inválido.');
    }

    const types = await TypeUser.find({
        where: {
            restrictions: MoreThan(user.typeUser.restrictions)
        }
    });

    const ids = types.map(x => x.id);
    const users = await User.find({
        relations: [ 'typeUser' ]
    });

    const data = users.filter(x => ids.find(y => y === x.typeUser.id));
    data.forEach(x => x.rut = Rut.format(x.rut));
    res.helper.json(data);
};
