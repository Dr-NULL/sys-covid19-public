type def = 'Function' | 'AsyncFunction' | 'Object' | 'Array' |
'Boolean' | 'Number' | 'String' | 'Symbol' | 'Null' | 'Undefined'

/**
 * Entrega una cadena indicando el tipo de dato al que corresponde una variable.
 * @param input  Variable de Entrada a comprobar.
 * @param strict [default = false] En caso de ser `false`, tanto si es null o undefined devolverá siempre "Null".
 *                                 En caso de ser `true`, devolverá "Null" o "Undefined" cuando corresponda.
 */
export function checker(input: any, strict = false): def {
  if (strict) {
    if (input === null) {
      return 'Null'
    } else if (input === undefined) {
      return 'Undefined'
    } else {
      return Object
        .getPrototypeOf(input)
        .constructor
        .name
    }
  } else {
    if (input == null) {
      return 'Null'
    } else {
      return Object
        .getPrototypeOf(input)
        .constructor
        .name
    }
  }

}

export default checker
