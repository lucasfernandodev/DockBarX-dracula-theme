import fs from 'fs';

export const dir = {
  isExist: async (dirPath) => await fs.existsSync(dirPath) && await fs.lstatSync(dirPath).isDirectory(),
  create: (dir) => fs.mkdirSync(dir),
}