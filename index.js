import chalk from 'chalk';
import {exec} from 'child_process';
import fs from 'fs';
import util from 'util';


const exec = util.promisify(exec);

// new Promise()
// 	.then(() => {
// 		console.log('run await promise has resolved');
// 	})
// 	.then(() => {
// 		new Promise()
// 			.then(() => {
// 				console.log('run await promise has resolved');
// 			})
// 		});

const first = chalk.yellow('Freddie');
const last = chalk.cyan('Kaplan');
const name = `${first} ${last}`

console.log(`

${name}

`);

console.log(`npm & node: ${process.env.npm_config_user_agent}`);

exec("git --version", (error, stdout, stderr) => {
	if (error) {
		console.log(`error: ${error.message}`);
		return;
	}
	if (stderr) {
		console.log(`stderr: ${stderr}`);
		return;
	}
	console.log(`git version: ${stdout}`);
});

const writeFile = async (file, data) => {
	try {
		await fs.promises.writeFile(file, data);
		console.log(`The file has been saved asynchronously!`);
	} catch (err) {
		console.log('err');
	}
};

const data = `
name: ${name}
npm & node: ${process.env.npm_config_user_agent}
git version: ${stdout}
`;
await writeFile("index.md", data);

console.log(format(new Date(2014, 0, 22), 'yyyy-mm-dd'))