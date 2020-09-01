import { EndPoint } from '../tool/server';

// Endpoints
import { test } from './test';
import { employeeGetRut } from './employee-get-rut';
import { vehicleGet } from './vehicle-get';
import { symptomGet } from './symptom-get';
import { formAdd } from './form-add';
import { menuGet } from './menu-get';
import { menuCheck } from './menu-check';
import { typeUserGet } from './type-user-get';
import { userSystemCheck } from './user-system-check';
import { userSystemAdd } from './user-system-add';
import { userlogin } from './user-login';
import { userLogout } from './user-logout';
import { userGet } from './user-get';
import { userAdd } from './user-add';
import { userDel } from './user-del';

export const routes: EndPoint[] = [
    test,
    employeeGetRut,
    vehicleGet,
    symptomGet,
    formAdd,
    menuGet,
    menuCheck,
    typeUserGet,
    userSystemCheck,
    userSystemAdd,
    userlogin,
    userLogout,
    userGet,
    userAdd,
    userDel
];
