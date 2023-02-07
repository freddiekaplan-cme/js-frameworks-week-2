import chalk from 'chalk';
import {exec} from 'child_process';
import fs from 'fs';
import util from 'util';
import { compareAsc, format, formatDistanceToNow } from 'date-fns'

//ENTER A DATE YYYY, MM, DD
let yourDate = '2023, 2, 7';

const asyncExec = util.promisify(exec);
const first = ('Freddie');
const last = ('Kaplan');
const name = `${first} ${last}`
const { stdout, stderr } = await asyncExec('git --version');
const compareDate = format(new Date(yourDate), 'yyyy-MM-dd')
const startOfCourse = new Date(2023, 0, 31)
const daysSinceStart = formatDistanceToNow(startOfCourse)
const todaysDate = format(new Date(), 'yyyy-MM-dd')
const message = chalk.bgGreen('You entered date ' + yourDate + '. Take a look in index.md.')
let beforeOrAfter = 'before';
console.log(message);

function dateComparison() {
	if (compareDate < todaysDate) {
		beforeOrAfter = 'before';
	}
	else if (compareDate > todaysDate) {
		beforeOrAfter = 'after';
	}
	else if (compareDate === todaysDate) {
		beforeOrAfter = 'exactly';
	}
}
dateComparison();

const data = `
Name: ${name}
Npm & node: ${process.env.npm_config_user_agent}
Git version: ${stdout}
Days since start of course: ${daysSinceStart}
Today's date: ${todaysDate}
Your entered date ${compareDate} is ${beforeOrAfter} today's date.
`;

await fs.promises.writeFile("index.md", data);