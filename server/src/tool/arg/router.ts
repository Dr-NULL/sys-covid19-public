import { Arg, Route } from '.';
import { NotFound } from './error';

type callback = (args: Arg) => void | Promise<void>;
type type = 'promise' | 'function' | 'other';

export class Router {
  public static async read(routes: Route[]) {
    const args = new Arg()

    let found = false
    for (const route of routes) {
      // Check array length
      if (args.main.length !== route.main.length) {
        continue
      }

      // Read both main arrays
      let foundCmd = true
      for (let i = 0; i < args.main.length; i++) {
        const cmdGet = args.main[i].toLowerCase()
        const cmdReq = route.main[i].map(x => x.toLowerCase())

        if (!cmdReq.find(x => x === cmdGet)) {
          foundCmd = false
        }
      }
      if (!foundCmd) {
        continue
      }

      // Execute
      try {
        await route.callback(args)
      } catch(err) {
        throw err
      }

      // End execution
      found = true
      break
    }

    // If not found
    if (!found) {
      throw new NotFound()
    }
  }
}