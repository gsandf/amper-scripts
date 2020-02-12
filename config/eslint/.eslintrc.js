const { projectPackageJson } = require('../../src/utils');

const isReactInstalled =
  projectPackageJson &&
  projectPackageJson.dependencies &&
  projectPackageJson.dependencies.react;

module.exports = {
  extends: [isReactInstalled ? 'gsandf-react' : 'gsandf']
};
