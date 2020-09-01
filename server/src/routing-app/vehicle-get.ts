import { Method } from '../tool/server';
import { Vehicle } from '../models/vehicle.entity';

export const vehicleGet = new Method.Get();
vehicleGet.path = 'vehicle/get';
vehicleGet.callback = async (req, res) => {
    const data = await Vehicle.find();
    res.helper.json(data);
};
