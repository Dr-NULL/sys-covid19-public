import { Method, ErrorHelper } from '../tool/server';
import { aesCrypto, appConfig } from '../api-rest';
import { UserCtrl } from '../ctrl-app/user-ctrl';

interface Body {
    nick: string;
    pass: string;
}

export const userlogin = new Method.Post();
userlogin.path = 'user/login';
userlogin.callback = async (req, res) => {
    // Comprobar si existe sesión
    if (req.session.current) {
        throw new ErrorHelper(409, 'Usted ya ha iniciado sesión, primero debe de cerrarla antes de volverla a iniciar.');
    }

    // Comprobar estado del body
    const body: Body = req.body;
    if (!body.nick) {
        throw new ErrorHelper(400, 'Se debe de especificar el campo "Nick" para iniciar sesión');
    } else if (!body.pass) {
        throw new ErrorHelper(400, 'Se debe de especificar el campo "Password" para iniciar sesión');
    }

    // Buscar usuario
    body.pass = aesCrypto.encrypt(body.pass);
    const user = await UserCtrl.login(body.nick, body.pass);
    if (!user) {
        throw new ErrorHelper(404, 'No existe usuario registrado con las credenciales entregadas');
    }

    // Crear sesión
    req.session.create()
    req.session.current.setData(user.id);
    res.helper.json(null, 200);
};
