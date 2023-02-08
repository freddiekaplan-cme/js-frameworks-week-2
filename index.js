import gitVersion from './src/gitVersion.js'
import chalk from 'chalk';
import fs from 'fs';
import { format, formatDistanceToNow } from 'date-fns';
import { Temporal, toTemporalInstant } from '@js-temporal/polyfill';
import { Command } from 'commander';

Date.prototype.toTemporalInstant = toTemporalInstant;

const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();
const dateArgument = argumentParser.args[0];

let yourDate = '';
let beforeOrAfter = '';
let timeSymbol ='';

(() => {
	yourDate = dateArgument.replace(/-/g, ", ");
})();

const first = ('Freddie');
const last = ('Kaplan');
const name = `${first} ${last}`
const compareDate = format(new Date(yourDate), 'yyyy-MM-dd')
const startOfCourse = new Date(2023, 0, 31)
const daysSinceStart = formatDistanceToNow(startOfCourse)
const todaysDate = format(new Date(), 'yyyy-MM-dd HH:mm')
const message = chalk.bgGreen('You entered date ' + argumentParser.args[0] + '. Take a look at index.html.')
const prettyNpmAndNode = process.env.npm_config_user_agent.slice(0, 23);
const prettyGit = await gitVersion();
const todayDateString = compareDate.toString();
const hebrewDate = Temporal.PlainDate.from(todayDateString).withCalendar('hebrew');

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
				Npm & Node version: <span class="results">${prettyNpmAndNode}</span>
			</div>
			<div class="content-item">
			Git version: <span class="results">${prettyGit}</span>
			</div>
			<div class="content-item">
				Days since start of course: <span class="results">${daysSinceStart}</span>
			</div>
			<div class="content-item">
				Today's date and time: <span class="results">${todaysDate}</span>
			</div>
			<div class="content-item">
				The entered date <span class="results">${compareDate}</span> is <span class="results">${beforeOrAfter}</span> today's date, and is in the year of <span class="results">${hebrewDate.year}</span> of the Hebrew calendar.
			</div>
    	</main>
		<footer class="footer">
			Made by ${name}
  		</footer>
</body>
</html>
`;

console.log(message);
await fs.promises.writeFile("index.html", fileContent);