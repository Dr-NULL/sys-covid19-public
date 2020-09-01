import { Symptom } from '../models/symptom.entity';
import '../tool/proto/string-capitalize';

export const symptoms = async () => {
    await addNew('Tos');
    await addNew('Dolor de Cabeza');
    await addNew('Dificultad Respiratoria');
    await addNew('Fiebre');
    await addNew('Dolor torácico');
    await addNew('Dolor de garganta al comer o tragar fluidos');
    await addNew('Mialgias o dolores musculares');
    await addNew('Calofríos');
    await addNew('Diarrea');
    await addNew('Perdida brusca del olfato');
    await addNew('Perdida brusca del gusto');
};

const addNew = (descript: string) => {
    const obj = new Symptom();
    obj.descript = descript.trim().capitalize();
    obj.isValid = true;
    return obj.save();
};
