const { codeBlock } = require('common-tags');
const format = require('./format').default;

const formatWrite = ({ args, options }) =>
  format({ args: [...args, '--write'], options });

function showHelp() {
  console.log(codeBlock`
    Enforce code formatting using Prettier; overwrite differing files.

    Usage:
    amper-scripts format-write [options] glob

    Options:
      options  any Prettier options (https://git.io/fjtgc)
      glob     a glob specifying additional files to format
  `);
}

module.exports = {
  default: formatWrite,
  showHelp
};
