import { Method } from '../tool/server';
import { EmployeeCtrl } from '../ctrl-app/employee-ctrl';

export const employeeGetRut = new Method.Get();
employeeGetRut.path = 'employee/get/:rut';
employeeGetRut.callback = async (req, res) => {
    const rut = decodeURI(req.params.rut);
    const data = await EmployeeCtrl.getByRut(rut);
    res.helper.json(data);
};
