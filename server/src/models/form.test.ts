import { Form } from './form.entity';
import { assert } from 'chai';
import { BaseOrm } from '../tool/other/base-orm';


describe('Testing "./models-app/form"', () => {
    before(async () => {
        await BaseOrm.connect();
    });

    it('Search In this day', async () => {
        const data = await Form.createQueryBuilder('Form')
            .select([ '*' ])
            .where('Form.date >= CONVERT(DATE, GETDATE())')
            .andWhere(
                'Form.employeeId = :id',
                { id: 276 }
            )
            .execute();

        console.log(data);
        assert.isArray(data);
    });

    after(async () => {
        await BaseOrm.disconnect();
    });
});
