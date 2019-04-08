const fs = require('fs');
const path = require('path');
const readPkgUp = require('read-pkg-up');

const { path: projectDirectory, pkg: projectPackageJson } = readPkgUp.sync();

const binPath = name => path.join('./node_modules/.bin', name);

const projectHasFile = filename =>
  fs.existsSync(path.join(projectDirectory, filename));

module.exports = {
  binPath,
  projectDirectory,
  projectHasFile,
  projectPackageJson
};
