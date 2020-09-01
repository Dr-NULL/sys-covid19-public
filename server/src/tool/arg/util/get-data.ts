import { Data } from '../data';

export function getData(arg: string[]) {
  const data: Data = {}

  let key: string
  let val: string[] = []
  while (arg.length > 0) {
    if (arg[0].match(/^-+/gi)) {
      // load previous
      if (key) {
        data[key] = val.map(x => x)
        val = []
      }

      // New Key
      key = arg[0]
        .replace(/^-+/gi, '')
        .toLowerCase()
    } else {
      val.push(arg[0])
    }

    arg.shift()
  }

  // Add last key
  if (!data[key] && key) {
    data[key] = val
  }

  return data
}