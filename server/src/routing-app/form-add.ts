import { FormCtrl, FormData } from '../ctrl-app/form-ctrl';
import { Method, ErrorHelper } from '../tool/server';
import { EmployeeCtrl } from '../ctrl-app/employee-ctrl';

export const formAdd = new Method.Post();
formAdd.path = 'form/add';
formAdd.callback = async (req, res) => {
    if (!req.session.current) {
        throw new ErrorHelper(401, 'Tiene que iniciar sesión para poder contestar la encuesta');
    } else {
        req.session.rewind();
    }

    const data: FormData = req.body;
    if (await EmployeeCtrl.hasRegToday(data.rut)) {
        throw new ErrorHelper(
                409, 'El RUT ingresado ya tiene una encuesta resuelta el día de hoy, '
            +   'por favor intente el día siguiente.'
        );
    }

    await FormCtrl.add(data, req.socket.remoteAddress);
    res.helper.json(null, 201);
};
