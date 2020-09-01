import { Arg } from '.';

export class Route {
  public main: string[][];
  public desc: string;
  public info: string;
  public callback: (args: Arg) => void | Promise<void>;
}