import { Employee } from '../models/employee.entity';
import '../tool/proto/string-capitalize';

export const employees = async () => {
    let obj = new Employee();
    obj.rut = '19';
    obj.name = 'Test Employee 01';
    obj.isInternal = true;
    obj.position = 'Programador';
    await obj.save();

    obj = new Employee();
    obj.rut = '0000';
    obj.name = 'Test Employee 02';
    obj.isInternal = true;
    obj.position = 'Programador';
    await obj.save();
};
