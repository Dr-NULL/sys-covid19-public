import { Method, ErrorHelper } from '../tool/server';

export const userLogout = new Method.Get();
userLogout.path = 'user/logout';
userLogout.callback = async (req, res) => {
    // Check session
    if (!req.session.current) {
        throw new ErrorHelper(409, 'No puede cerrar sesión debido a que no tienen ninguna sesión abierta.');
    }

    req.session.delete();
    await new Promise<void>(resolve => {
        setTimeout(resolve, 500);
    });

    res.helper.json(null, 200);
};
