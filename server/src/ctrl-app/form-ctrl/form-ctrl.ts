import { RelFormSymptom } from '../../models/rel-form-symptom.entity';
import { Symptom } from '../../models/symptom.entity';
import { Vehicle } from '../../models/vehicle.entity';
import { Form } from '../../models/form.entity';

import { EmployeeCtrl } from '../employee-ctrl';
import { ErrorHelper } from '../../tool/server';
import { FormData } from './form-data';
import { In } from 'typeorm';

export class FormCtrl {
    public static async add(data: FormData, ip: string) {
        // Buscar Trabajador
        const employee = await EmployeeCtrl.getByRut(data.rut);
        if (!employee) {
            throw new ErrorHelper(404, 'El RUT ingresado no se encuentra registrado en nuestro sistema');
        }

        // Buscar Vehículo
        const vehicle = await Vehicle.findOne({ id: data.vehicleId });
        if (!vehicle) {
            throw new ErrorHelper(404, 'El vehículo especificado no se encuentra registrado en nuestro sistema');
        }

        // Crear Formulario
        const form = new Form();
        form.ip = ip;
        form.employee = employee;
        form.vehicle = vehicle;
        form.question01 = data.question01;
        form.question02 = data.question02;
        form.question03 = data.question03;
        form.question04 = data.question04;
        form.question05 = data.question05;
        await form.save();
        
        // Revisar si hay síntomas
        if (data.symptomsIds.length === 0) {
            return;
        }

        // Buscar enfermedades
        const symptoms = await Symptom.find({
            where: { id: In(data.symptomsIds) }
        });
        for (const id of data.symptomsIds) {
            if (!symptoms.find(x => x.id === id)) {
                throw new ErrorHelper(404, 'Uno de los síntomas especificados no se encuentra registrado en nuestro sistema');
            }
        }

        // Vincular síntomas
        for (const symptom of symptoms) {
            const relation = new RelFormSymptom();
            relation.form = form;
            relation.symptom = symptom;
            await relation.save();
        }
    }
}
