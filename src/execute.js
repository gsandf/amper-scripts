const execa = require('execa');

/**
 * Executes a command and handles piping stderr/stdout
 * @param {String} file - the executable to run
 * @param {Array<String>} args - arguments passed to the executable
 * @param {Object} options - options passed to `execa`
 * @returns {Promise} Resolves when command has completed running
 */
const execute = (file, args, options) =>
  execa(file, args, { stdio: 'inherit', ...options });

module.exports = execute;
