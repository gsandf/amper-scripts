const { projectPackageJson } = require('../src/utils');

module.exports = {
  extends: ['gsandf-react', 'prettier'],
  settings: {
    react: {
      version: projectPackageJson.dependencies.react ? 'detect' : 'latest'
    }
  }
};
