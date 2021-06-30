const { has } = require('@blakek/deep');
const { projectPackageJson } = require('../../src/utils');

function isDependentOn(dependencyName) {
  return (
    has(['dependencies', dependencyName], projectPackageJson) ||
    has(['devDependencies', dependencyName], projectPackageJson)
  );
}

function getBaseConfig() {
  if (isDependentOn('typescript')) {
    return 'gsandf-typescript';
  }

  if (isDependentOn('react')) {
    return 'gsandf-react';
  }

  return 'gsandf';
}

module.exports = {
  extends: [getBaseConfig()],
  parserOptions: {
    project: './tsconfig.json'
  }
};
