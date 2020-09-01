import { Route } from '../tool/arg';
import chalk from 'chalk';

export const help = new Route();
help.main = [
    [ 'help', 'hlp', 'h' ]
];
help.desc = 'Show the documentation of the current program.';
help.info = `${chalk.grey('--command')} / ${chalk.grey('--cmd')} → Command to execute`;
help.callback = args => {
    
};