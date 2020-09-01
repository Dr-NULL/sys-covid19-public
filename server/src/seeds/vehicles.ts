import { Vehicle } from '../models/vehicle.entity';
import '../tool/proto/string-capitalize';

export const vehicles = async () => {
    await addNew('Publico');
    await addNew('Particular');
    await addNew('Transporte Empresa');
    await addNew('Otros');
};

const addNew = (descript: string) => {
    const obj = new Vehicle();
    obj.descript = descript.trim().capitalize();
    return obj.save();
};
