const { projectPackageJson } = require('../../src/utils');

module.exports = {
  extends: ['gsandf-react', 'prettier'],
  parser: 'babel-eslint',
  settings: {
    react: {
      version: projectPackageJson.dependencies.react ? 'detect' : 'latest'
    }
  }
};
