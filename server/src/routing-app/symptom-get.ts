import { Method } from '../tool/server';
import { Symptom } from '../models/symptom.entity';

export const symptomGet = new Method.Get();
symptomGet.path = 'symptom/get';
symptomGet.callback = async (req, res) => {
    const data = await Symptom.find({ isValid: true });
    res.helper.json(data);
}
