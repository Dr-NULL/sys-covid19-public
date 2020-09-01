import { Method, ErrorHelper } from '../tool/server';
import { aesCrypto } from '../api-rest';
import { TypeUser } from '../models/type-user.entity';
import { User } from '../models/user.entity';
import { Rut } from '../tool/other/rut';

interface Body {
    rut: string;
    mail: string;
    nick: string;
    pass: string;
}

export const userSystemAdd = new Method.Post();
userSystemAdd.path = 'user/system/add';
userSystemAdd.callback = async (req, res) => {
    // Check system existence
    const type = await TypeUser.findOne({ restrictions: 0 });
    const user = await User.findOne({ typeUser: type });
    if (user) {
        throw new ErrorHelper(409, 'No se puede volver a crear un usuario del tipo system.');
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

    // Crear usuario system
    const syst = new User();
    syst.rut = body.rut;
    syst.mail = body.mail;
    syst.nick = body.nick;
    syst.pass = aesCrypto.encrypt(body.pass);
    syst.typeUser = type;
    await syst.save();

    res.helper.json(null, 201);
};
