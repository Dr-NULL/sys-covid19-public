import { Method, ErrorHelper } from '../tool/server';
import { Rut } from '../tool/other/rut';
import { aesCrypto } from '../api-rest';
import { TypeUser } from '../models/type-user.entity';
import { User } from '../models/user.entity';
import { UserCtrl } from '../ctrl-app/user-ctrl';

interface Body {
    rut: string;
    mail: string;
    nick: string;
    pass: string;
    type: number;
}

export const userAdd = new Method.Post();
userAdd.path = 'user/add';
userAdd.callback = async (req, res) => {
    let myId: number;
    if (!req.session.current) {
        throw new ErrorHelper(401, 'Necesita iniciar sesión para poder crear un nuevo usuario.')
    } else {
        myId = req.session.current.getData();
    }
    const self = await UserCtrl.get(myId);
    if (!self) {
        throw new ErrorHelper(401, 'El usuario actual es inválido.');
    }

    // Check fields
    const body: Body = req.body;
    if (!body.rut) {
        throw new ErrorHelper(400, 'No se puede crear el usuario debido a que falta el campo "RUT".')
    } else if (!body.mail) {
        throw new ErrorHelper(400, 'No se puede crear el usuario debido a que falta el campo "E-Mail".')
    } else if (!body.nick) {
        throw new ErrorHelper(400, 'No se puede crear el usuario debido a que falta el campo "Nick".')
    } else if (!body.pass) {
        throw new ErrorHelper(400, 'No se puede crear el usuario debido a que falta el campo "Password".')
    } else if (!body.type) {
        throw new ErrorHelper(400, 'No se puede crear el usuario debido a que falta el campo "Tipo Usuario".')
    }

    // Chequear RUT
    if (!Rut.isValid(body.rut)) {
        throw new ErrorHelper(400, 'El RUT entregado es inválido.')
    } else {
        body.rut = body.rut
            .toLowerCase()
            .replace(/[^0-9k]/gi, '')
            .replace(/^0+/gi, '');
    }

    const type = await TypeUser.findOne({ id: body.type });
    if (type.restrictions <= self.typeUser.restrictions) {
        throw new ErrorHelper(403, 'No tiene los permisos suficientes para crear un usuario de este tipo.');
    }
    
    // Check user existence
    let user = await User.findOne({
        where: [
            { rut: body.rut },
            { mail: body.mail },
            { nick: body.nick }
        ]
    });
    if (user) {
        throw new ErrorHelper(409, 'No se puede volver a crear un usuario con el mismo RUT, E-Mail o Nick.');
    }

    // Crear usuario
    user = new User();
    user.rut = body.rut;
    user.mail = body.mail;
    user.nick = body.nick;
    user.pass = aesCrypto.encrypt(body.pass);
    user.typeUser = type;
    await user.save();

    res.helper.json(null, 201);
};
