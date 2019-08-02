#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { codeBlock } = require('common-tags');

const [script, ...args] = process.argv.slice(2);

/**
 * Format an array as a bulleted list string
 *
 * @param {String[]} arr - the array to format
 * @return {String} array elements as a bulleted list
 */
const bulletedList = arr => arr.map(e => `  - ${e}`).join('\n');

/**
 * Get scripts this file can run
 *
 * @return {String[]} array of script names
 */
function getAvailableScripts() {
  const jsFileExt = /\.m?jsx?$/;
  const dir = path.join(__dirname, './scripts');

  return fs
    .readdirSync(dir)
    .filter(name => {
      const stat = fs.statSync(path.join(dir, name));
      // Filter directories and non *.js files
      return stat.isFile() && jsFileExt.test(path.extname(name));
    })
    .map(filename => filename.replace(jsFileExt, ''));
}

/**
 * Shows usage
 */
function showUsage() {
  console.log(
    codeBlock`
      Usage:
      amper-scripts [script] [args]

      Available scripts:
      ${bulletedList(getAvailableScripts())}

      For more info, see https://github.com/gsandf/amper-scripts
    `
  );
}

// When ran without any args, print available scripts
if (!script || script === '-h' || script === '--help') {
  showUsage();
  process.exit(0);
}

let childScript;

try {
  childScript = require(`./scripts/${script}`).default;
} catch (error) {
  console.error(
    codeBlock`
      Unknown script ${script}.

      Script should be one of:
       ${bulletedList(getAvailableScripts())}
    `
  );

  process.exit(1);
}

Promise.resolve(
  childScript({
    args,
    options: { stdio: 'inherit' }
  })
).catch(error => {
  process.exit(error.code);
});
