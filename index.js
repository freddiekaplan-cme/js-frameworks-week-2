import chalk from 'chalk';
import {exec} from 'child_process';
import fs from 'fs';
import util from 'util';
import { format, formatDistanceToNow } from 'date-fns';
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
import { Command } from 'commander';

const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();
const dateArgument = argumentParser.args[0];

const asyncExec = util.promisify(exec);
const first = ('Freddie');
const last = ('Kaplan');
const name = `${first} ${last}`
const { stdout, stderr } = await asyncExec('git --version');
const compareDate = format(new Date(yourDate), 'yyyy-MM-dd')
const startOfCourse = new Date(2023, 0, 31)
const daysSinceStart = formatDistanceToNow(startOfCourse)
const todaysDate = format(new Date(), 'yyyy-MM-dd')
const message = chalk.bgGreen('You entered date ' + argumentParser.args[0] + '. Take a look in index.md.')
const prettyNpmAndNode = process.env.npm_config_user_agent.slice(0, 23);
const prettyGit = stdout.slice(0, 18);
//const hebrewCal = Temporal.Calendar.from('hebrew');
//const hebrewDate = Temporal.Now.plainDateTime('hebrew');
let yourDate = '2023, 2, 7';
let beforeOrAfter = 'before';
Date.prototype.toTemporalInstant = toTemporalInstant;

function dateFormatAdjust() {
	yourDate = dateArgument.replace(/-/g, ", ");
}
dateFormatAdjust();

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

// cal = Temporal.Calendar.from('hebrew')
// const today = date.withCalendar('hebrew');
// console.log(today.toString());

console.log(message);

const fileContent = `
Name: ${name}
Npm & node: ${prettyNpmAndNode}
Git version: ${prettyGit}
Days since start of course: ${daysSinceStart}
Today's date: ${todaysDate}
Today's date in the Hebrew calendar: ${hebrewDate}
Your entered date ${compareDate} is ${beforeOrAfter} today's date.
`;

await fs.promises.writeFile("index.md", fileContent);