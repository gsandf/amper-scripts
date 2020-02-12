const { projectPackageJson } = require('../../src/utils');

module.exports = {
  extends: [
    projectPackageJson.dependencies.react ? 'gsandf-react' : 'gsandf',
    'prettier'
  ],
  parser: 'babel-eslint'
};
