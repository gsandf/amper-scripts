const { codeBlock } = require('common-tags');

function lint(...args) {
  console.log('called with args', args);
}

function showHelp() {
  console.log(codeBlock`
    Lints the project using ESLint.

    Usage:
    amper-scripts lint [options] [...file.js] [dir]

    Options:
      options  any ESLint options (https://git.io/fjtuI)
  `);
}

module.exports = {
  default: lint,
  showHelp
};
