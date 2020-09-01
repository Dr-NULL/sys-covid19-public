import chalk from 'chalk';

export module Colors {
  export const title = {
    orange: chalk.keyword('orange').bold,
    white: chalk.white.bold,
    grey: chalk.grey
  }

  export const message = {
    grey: chalk.grey,
    white: chalk.white,
    bold: chalk.white.bold
  }

  export const type = {
    event: chalk.white.bgKeyword('orange').bold,
    success: chalk.white.bgKeyword('green').bold,
    error: chalk.white.bgKeyword('red').bold,
    timer: chalk.white.bgKeyword('blue').bold
  }
}