const { codeBlock } = require('common-tags');
const execa = require('execa');
const path = require('path');
const { binPath, projectHasFile, projectPackageJson } = require('../utils');

const getDefaultConfig = () =>
  require.resolve('../../config/prettier.config.js');

async function format({ args, options }) {
  // See https://prettier.io/docs/en/configuration.html
  const hasSpecifiedConfig =
    args.includes('--config') ||
    projectHasFile('.prettierrc') ||
    projectHasFile('.prettierrc.yaml') ||
    projectHasFile('.prettierrc.yml') ||
    projectHasFile('.prettierrc.json') ||
    projectHasFile('.prettierrc.toml') ||
    projectHasFile('prettier.config.js') ||
    projectHasFile('.prettierrc.js') ||
    typeof projectPackageJson.prettier === 'object';

  const hasSpecifiedIgnoreFile =
    args.includes('--ignore-path') || projectHasFile('.prettierignore');

  const argsWithDefaults = [
    // Use a default config if none specified
    ...(hasSpecifiedConfig ? [] : ['--config', getDefaultConfig()]),
    // Use a default ignore file if not specified
    ...(hasSpecifiedIgnoreFile
      ? []
      : [
          '--ignore-path',
          path.resolve(__dirname, '../../config/.prettierignore')
        ]),
    ...args
  ];

  return execa(binPath('prettier'), argsWithDefaults, options);
}

function showHelp() {
  console.log(codeBlock`
    Format the project using Prettier.

    Usage:
    amper-scripts format [options] glob

    Options:
      options  any Prettier options (https://git.io/fjtgc)
      glob     a file, directory, or glob specifying files to format
  `);
}

module.exports = {
  default: format,
  showHelp
};
