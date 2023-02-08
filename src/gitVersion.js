import {exec} from 'child_process';
import util from 'util';

async function gitVersion() {
	const asyncExec = util.promisify(exec);
	const { stdout, stderr } = await asyncExec('git --version');
	const myGit = stdout.slice(0, 18);
	return myGit;
}

export default gitVersion;