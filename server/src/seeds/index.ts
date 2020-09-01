import { symptoms } from './symptoms';
import { vehicles } from './vehicles';
import { employees } from './employees';
import { typeUserMenu } from './type-user-menu';

export const seedFunctions: (() => Promise<void>)[] = [
    symptoms,
    vehicles,
    employees,
    typeUserMenu
];
