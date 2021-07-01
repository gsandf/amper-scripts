const fs = require('fs');
const path = require('path');
const readPkgUp = require('read-pkg-up');

const { path: projectPackageJsonPath, packageJson: projectPackageJson } =
  readPkgUp.sync();

const projectDirectory = path.dirname(projectPackageJsonPath);

const binPath = name => path.join(__dirname, '../node_modules/.bin', name);

const projectHasFile = filename =>
  fs.existsSync(path.join(projectDirectory, filename));

module.exports = {
  binPath,
  projectDirectory,
  projectHasFile,
  projectPackageJson
};
