import { resolve } from 'path';
import { dir } from './src/utils/dir.js';
import { shell } from './src/utils/shell.js';

let commandFormatted = null;

const dist = './dist';
const themePaths = [
  './src/theme/dracula',
  './src/theme/dock/dracula',
  './src/theme/popup_styles/dracula'
]


const commands = {
  pack: (output) => `tar -czvf ${resolve(output)} *`,
  cd: (path) => `cd ${resolve(path)}`
}

if (!await dir.isExist(dist)) {
  dir.create(dist);
}


themePaths.forEach(async (path, index) => {

  const filename = 'dracula.tar.gz';

  const _path = path.replace(".", " ").replace('/src/theme/', " ").trim()
  const subdirectory = _path.includes("/") ? _path.split("/")[0] : null;

  // Path to gzip 
  const tarball = !subdirectory ? `${dist}/${filename}` : `${dist}/${subdirectory}/${filename}`;

  // Create folders
  if (subdirectory && !await dir.isExist(dist + '/' + subdirectory)) {
    await dir.create(dist + '/' + subdirectory);
  }

  // generating command string
  if (commandFormatted == null) {
    commandFormatted = `${commands.cd(path)} && ${commands.pack(tarball)}`
  } else {
    commandFormatted = `${commandFormatted} && ${commands.cd(path)} && ${commands.pack(tarball)}`
  }

  // running the commands
  if ((index + 1) === themePaths.length) {
    shell(commandFormatted)
  }
})




