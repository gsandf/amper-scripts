const { codeBlock } = require('common-tags');

function showScriptHelp(...args) {
  const [script] = args;

  try {
    const helpFunction = require(`./${script}`).showHelp;
    if (!helpFunction) {
      throw new Error(`No help found for ${script}`);
    }
    helpFunction();
  } catch (e) {
    console.error(e.message);
  }
}

function showHelp() {
  console.log(codeBlock`
    Shows help for a command.

    Usage: amper-scripts help [command]
  `);
}

module.exports = {
  default: showScriptHelp,
  showHelp
};
