const { codeBlock } = require('common-tags');
const format = require('./format').default;

const formatCheck = ({ args, options }) =>
  format({ args: [...args, '--check'], options });

function showHelp() {
  console.log(codeBlock`
    Check project code formatting using Prettier and list any differing files.

    Usage:
    amper-scripts format-check [options] glob

    Options:
      options  any Prettier options (https://git.io/fjtgc)
      glob     a glob specifying additional files to format
  `);
}

module.exports = {
  default: formatCheck,
  showHelp
};
