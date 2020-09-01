import chalk from 'chalk'
import '../proto/number-format';
import { Colors } from './colors';

export class Log {
  public static title(title: string, ver: string = '1.0.0') {
    console.clear()
    console.log(
        Colors.title.grey('<<------(( ')
      + Colors.title.orange(title)
      + Colors.title.white(' v' + ver)
      + Colors.title.grey(' ))------>>\n')
    )
  }

  private static now() {
    const time = new Date()
    return  `${time.getHours().format(2)}:`
          + `${time.getMinutes().format(2)}:`
          + `${time.getSeconds().format(2)}`
  }

  public static write(color: chalk.Chalk, type: string, ...input: string[]) {
    const text: string[] = []
    for (const item of input) {
      text.push(...item.split(/\n/gi))
    }

    console.log(
        Colors.message.grey('[' + this.now() + ']') + ' '
      + color(type)
      + Colors.message.white(`: ${text.shift()}`)
    )
    this.ln(...text)
  }

  public static ln(...input: string[]) {
    const text: string[] = []
    for (const item of input) {
      text.push(...item.split(/\n/gi))
    }

    for (const item of text) {
      console.log(
          '                    '
        + item
      )
    }
  }

  public static ev(...input: string[]) {
    this.write(Colors.type.event, ' EVENT ', ...input)
  }

  public static ok(...input: string[]) {
    this.write(Colors.type.success, 'SUCCESS', ...input)
  }

  public static er(...input: string[]) {
    this.write(Colors.type.error, ' ERROR ', ...input)
  }

  public static sep() {
    console.log(Colors.message.grey(
        `-----------------------------------------`
      + `----------------------------------------\n`
    ))
  }
}