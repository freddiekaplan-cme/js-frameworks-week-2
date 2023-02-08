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

//2023, 2, 7
let yourDate = '';
let beforeOrAfter = '';
let timeSymbol ='';

function dateFormatAdjust() {
	yourDate = dateArgument.replace(/-/g, ", ");
}
dateFormatAdjust();

const asyncExec = util.promisify(exec);
const first = ('Freddie');
const last = ('Kaplan');
const name = `${first} ${last}`
const { stdout, stderr } = await asyncExec('git --version');
const compareDate = format(new Date(yourDate), 'yyyy-MM-dd')
const startOfCourse = new Date(2023, 0, 31)
const daysSinceStart = formatDistanceToNow(startOfCourse)
const todaysDate = format(new Date(), 'yyyy-MM-dd')
const message = chalk.bgGreen('You entered date ' + argumentParser.args[0] + '. Take a look at index.html.')
const prettyNpmAndNode = process.env.npm_config_user_agent.slice(0, 23);
const prettyGit = stdout.slice(0, 18);
//const hebrewCal = Temporal.Calendar.from('hebrew');
//const hebrewDate = Temporal.Now.plainDateTime('hebrew');
Date.prototype.toTemporalInstant = toTemporalInstant;

function dateComparison() {
	if (compareDate < todaysDate) {
		beforeOrAfter = 'before';
		timeSymbol = '⌛';
	}
	else if (compareDate > todaysDate) {
		beforeOrAfter = 'after';
		timeSymbol = '🚀';
	}
	else if (compareDate === todaysDate) {
		beforeOrAfter = 'exactly';
		timeSymbol = '⏰';
	}
}
dateComparison();

// cal = Temporal.Calendar.from('hebrew')
// const today = date.withCalendar('hebrew');
// console.log(today.toString());
//Today's date in the Hebrew calendar: ${hebrewDate}

console.log(message);

const fileContent = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="style.css" />
    	<title>Week 2</title>
	</head>
	<body>
		<header class="header">
			<h1>Week 2 ${timeSymbol}</h1>
    	</header>
    	<main class="content">
			<div class="content-item">
				Npm & node: ${prettyNpmAndNode}
			</div>
			<div class="content-item">
				Git version: ${prettyGit}
			</div>
			<div class="content-item">
				Days since start of course: ${daysSinceStart}
			</div>
			<div class="content-item">
				Today's date: ${todaysDate}
			</div>
			<div class="content-item">
				Your entered date ${compareDate} is ${beforeOrAfter} today's date.
			</div>
    	</main>
		<footer class="footer">
			Made by ${name}
  		</footer>
</body>
</html>
`;

console.log(yourDate);
console.log(compareDate);
console.log(todaysDate);

await fs.promises.writeFile("index.html", fileContent);