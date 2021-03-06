const { codeBlock } = require('common-tags');
const execa = require('execa');
const { binPath, projectHasFile, projectPackageJson } = require('../utils');

const getDefaultConfig = () => require.resolve('../../config/eslint');

async function lint({ args, options }) {
  // See https://eslint.org/docs/user-guide/configuring#configuration-file-formats
  const hasSpecifiedConfig =
    args.includes('--config') ||
    projectHasFile('.eslintrc.js') ||
    projectHasFile('.eslintrc.yaml') ||
    projectHasFile('.eslintrc.yml') ||
    projectHasFile('.eslintrc.json') ||
    projectHasFile('.eslintrc') ||
    typeof projectPackageJson.eslintConfig === 'object';

  const argsWithDefaults = [
    // Use a default config if none specified
    ...(hasSpecifiedConfig ? [] : ['--config', getDefaultConfig()]),

    // Either add default files to lint or whatever is passed to the script
    ...(args.length === 0 ? ['src/'] : args)
  ];

  return execa(binPath('eslint'), argsWithDefaults, options);
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
