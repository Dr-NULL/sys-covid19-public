import { Employee } from '../models/employee.entity';
import { Rut } from '../tool/other/rut';
import { Like } from 'typeorm';
import { Form } from '../models/form.entity';

export class EmployeeCtrl {
    public static async getByRut(rut: string) {
        let data: Employee;
        rut = Rut.format(rut);
        rut = rut.replace(/[^0-9k]/gi, '');
        
        // Filter by rut
        if (rut.length > 0) {
            rut += '%';
            data = await Employee.findOne({
                where: { rut: Like(rut) }
            });

            // Formatear RUT
            if (data) {
                data.rut = Rut.format(data.rut);
            }
            return data;
        } else {
            return null;
        }
    }

    public static async hasRegToday(rut: string) {
        rut = Rut.format(rut);
        rut = rut.replace(/[^0-9k]/gi, '');

        // Buscar empleado
        const employee = await Employee.findOne({
            where: { rut: Like(rut) }
        });
        if (!employee) {
            return false;
        }

        // Buscar encuestas
        const data: any[] = await Form.createQueryBuilder('Form')
            .select([ '*' ])
            .where('Form.date >= CONVERT(DATE, GETDATE())')
            .andWhere(
                'Form.employeeId = :id',
                { id: employee.id }
            )
            .execute();

        // Return Response
        return (data.length > 0);
    }
}
