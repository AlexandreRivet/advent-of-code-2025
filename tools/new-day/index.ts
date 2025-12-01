import * as fs from 'fs';
import * as path from 'path';

const day = process.argv[2];
if (!day) {
  console.error('Please specify day number (ex: 1)');
  process.exit(1);
}

const dayFolder = path.join(__dirname, `../../days/day-${day.padStart(2, '0')}`);

if (fs.existsSync(dayFolder)) {
  console.error(`Directory for day ${day} already exists.`);
  process.exit(1);
}

const templateFolder = path.join(__dirname, '/template');

fs.cpSync(templateFolder, dayFolder, {recursive: true});

console.log(`Directory for day ${day} has been created !`);