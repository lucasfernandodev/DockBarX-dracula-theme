import { exec } from 'child_process';

export function shell(commands) {
  exec(commands, (error, stdout, stderr) => {

    if (error) { return console.log(`error: ${error.message}`) }

    if (stderr) { return console.log(`stderr: ${stderr}`); }

    console.log("Successfully Build", stdout)
  });
}