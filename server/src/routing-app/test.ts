import { Method } from '../tool/server';

export const test = new Method.Get();
test.path = 'test';
test.callback = async (req, res) => {
    res.helper.json({
        text: 'gegege',
        value: 666
    })
};
