import { checker } from './checker';

interface ObjK {
  [ key: string ]: any;
}

// Determinar si es primitivo
const isPrimit = (obj: any) => {
  if (obj == null) {
    return true;
  }

  switch (typeof obj) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'symbol':
      return true;
    default:
      return false;
  }
};

const cloneObject = (obj: any): any => {
  const keys = Object.keys(obj);
  const resp: any = {};

  for (const key of keys) {
    if (isPrimit(obj[key])) {
      resp[key] = obj[key];
    } else if (checker(obj[key]) === 'Array') {
      resp[key] = cloneArray(obj[key]);
    } else {
      resp[key] = cloneObject(obj[key]);
    }
  }

  return resp;
};

const cloneArray = (arr: any): any[] => {
  return arr.map((x: any) => {
    if (isPrimit(x)) {
      return x;
    } else if (checker(x) === 'Array') {
      return cloneArray(x);
    } else {
      return cloneObject(x);
    }
  });
};

export const clone = <T>(input: T): T => {
  if (isPrimit(input)) {
    return input;
  } else if (checker(input) === 'Array') {
    return (cloneArray(input) as any);
  } else {
    return cloneObject(input);
  }
};

export default clone;
