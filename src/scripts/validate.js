const { codeBlock } = require('common-tags');
const Listr = require('listr');

const makeTask = (commandName, args) => async () =>
  require(`./${commandName}`).default({ args });

function validate({ args = [] }) {
  const tasks = [
    {
      skip: () => args.includes('--no-lint') && 'Specified --no-lint',
      task: makeTask('lint', args),
      title: '🚨  Linting files'
    },
    {
      skip: () =>
        args.includes('--no-format-check') && 'Specified --no-format-check',
      task: makeTask('format-check', args),
      title: '💅  Checking code formatting'
    }
  ];

  const listr = new Listr(tasks, {
    concurrent: true,
    exitOnError: true
  });

  listr.run().catch(error => {
    console.error(error.stdout || error);
    process.exit(error.code || 1);
  });
}

function showHelp() {
  console.log(codeBlock`
    Runs commands to check the project (i.e. lint, format-check) all at once.

    Usage: amper-scripts validate

    Options:
      --no-format-check  skip code formatting checks
      --no-lint          skip linting
  `);
}

module.exports = {
  default: validate,
  showHelp
};
