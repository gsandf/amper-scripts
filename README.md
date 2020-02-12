# amper-scripts ![](.repo/gsandf-small.png)

> ⏩ some tools to make project setup easier

## Why

- **Create one set of basic standards** and re-use them everywhere.
- **Easily opt-out:** any detected config file automatically overrides defaults.
- **Easily extend:** config files are made to be basic and extendable.
- **One command** can get a decent baseline for testing on your CI servers.

## Install

Using [Yarn](https://yarnpkg.com/):

```shell
$ yarn add -D amper-scripts
```

…or using [npm](https://www.npmjs.com/):

```shell
$ npm i --save-dev amper-scripts
```

## Usage

### Setting up in a project

A lot of setup is included, but you'll need to do a little setup. This is
because your text editor likely expects config files to be in the project
directory.

First, install using [one of the commands above](#Install).

#### Quick setup

Add or update your `.eslintrc.js`:

```js
module.exports = require('amper-scripts/config/.eslintrc.js');
```

Add or update your `prettier.config.js`:

```js
module.exports = require('amper-scripts/config/prettier.config.js');
```

Change scripts in your `package.json` or CI/CD setup to run this instead of
`eslint` or `prettier`:

```json
{
  "scripts": {
    "lint": "amper-scripts lint",
    "format": "amper-scripts format-write",
    "validate": "amper-scripts validate"
  }
}
```

#### Using different settings

Most commands allow you to extend or opt-out of the default config. In most
cases to opt-out, just write the config file as you normally would and it'll be
picked up.

**Example: Extending ESLint config:**

```js
module.exports = {
  extends: [require.resolve('amper-scripts/config/eslint')],
  rules: {
    /* your custom rules */
  }
  // you can also change any other settings, such as `env`
};
```

**Example: Extending Prettier config**

```js
const gsandfDefaults = require('amper-scripts/config/prettier.config.js');

module.exports = {
  ...gsandfDefaults
  // your rules
};
```

### Getting help

If you ever forget what commands are available, just ask for help:

```shell
$ amper-scripts --help
```

If you need help on a specific command, run the `help` script:

```shell
$ amper-scripts help [command]
```

### Enforcing code formatting

Check project code formatting using [Prettier](https://prettier.io/) and list
any differing files:

```shell
$ amper-scripts format-check
```

Enforce code formatting using Prettier, overwriting differing files:

```shell
$ amper-scripts format-write
```

Or, just get vanilla Prettier with the default config and ignore applied:

```shell
$ amper-scripts format [arguments]
```

Override the Prettier config by adding [any allowed config
file](https://prettier.io/docs/en/configuration.html). The configuration is not
merged; any detected configuration file is used as the base.

### Catching code errors

Lint the project using [ESLint](https://eslint.org/):

```shell
$ amper-scripts lint
```

Override linting rules by adding any [configuration file allowed by
ESLint](https://eslint.org/docs/user-guide/configuring#configuration-file-formats).
The configuration is not merged; any detected configuration file is used as the
base.

To extend the config in this repo, see ["using different
settings"](#Using-different-settings) above.

Additional arguments are passed to ESLint. For example, you can specify files to
validate:

```shell
$ amper-scripts lint ./source
```

### Validating project

This runs commands to generally check the project (i.e. lint, format-check) all
at once. This is good for CI servers because it's fast, exits if anything fails,
and is oriented toward showing you where errors occur:

```shell
$ amper-scripts validate
```

You can opt-out of individual steps as needed:

```shell
$ amper-scripts validate --no-lint
```

Use `amper-scripts help validate` for all available options.
