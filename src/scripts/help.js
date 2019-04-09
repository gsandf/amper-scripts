const { codeBlock } = require('common-tags');

function showScriptHelp({ args }) {
  const [script] = args;

  if (!script) {
    return showHelp();
  }

  try {
    const helpFunction = require(`./${script}`).showHelp;

    if (!helpFunction) {
      throw new Error(`No help found for ${script}`);
    }

    helpFunction();
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(codeBlock`
    Shows help for a command.
    If you want to list available commands, use --help instead.

    Usage: amper-scripts help [command]
  `);
}

module.exports = {
  default: showScriptHelp,
  showHelp
};
