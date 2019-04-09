# amper-scripts ![](.repo/gsandf-small.png)

> ⏩ some tools to make project setup easier

## Why

- **Learn a best-practice once** then re-use it everywhere.
- **Easily opt-out:** any detected config file automatically overrides defaults.
- **Easily extend:** config files are made to be extendable.
- **One command** can get a decent baseline for testing in your CI servers.

## Install

Using [Yarn](https://yarnpkg.com/):

```shellsession
$ yarn add -D amper-scripts
```

…or using [npm](https://www.npmjs.com/):

```shellsession
$ npm i --save-dev amper-scripts
```

## Usage

### Setting up in a project

Install using [one of the commands above](#Install).

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
    "format": "amper-scripts format",
    "validate": "amper-scripts validate"
  }
}
```

### Getting help

If you ever forget what's available, just ask for help:

```shellsession
$ amper-scripts --help
```

If you need help on a specific command, run the `help` script:

```shellsession
$ amper-scripts help [command]
```

### Enforcing code formatting

Check project code formatting using [Prettier](https://prettier.io/) and list
any differing files:

```shellsession
$ amper-scripts format-check
```

Enforce code formatting using Prettier; overwrite differing files:

```shellsession
$ amper-scripts format-write
```

Or, just get vanilla Prettier with the default config and ignore applied:

```shellsession
$ amper-scripts format [arguments]
```

Override the Prettier config by adding [any allowed config
file](https://prettier.io/docs/en/configuration.html). The configuration is not
merged; any configuration is used as the base.

To extend the config in this repo, you can add the following in your
`prettier.config.js`:

```js
module.exports = require('amper-scripts/config/prettier.config.js');
```

### Catching code errors

Lint the project using [ESLint](https://eslint.org/):

```shellsession
$ amper-scripts lint
```

Override linting rules by adding any [configuration file allowed by
ESLint](https://eslint.org/docs/user-guide/configuring#configuration-file-formats).
The configuration is not merged; any configuration is used as the base.

To extend the config in this repo, you can add the following in your
`.eslintrc.js`:

```js
module.exports = {
  extends: ['amper-scripts/config/.eslintrc.js'],
  rules: [
    // Add any custom rules
  ]
};
```

Also, you likely need a config file at the root of your repo so your editor can
use it. You can just re-export the built-in configuration in a `.eslintrc.js` in
your project root:

```js
module.exports = require('amper-scripts/config/.eslintrc.js');
```

Additional arguments are passed to ESLint. For example, you can add additional
files to validate:

```shellsession
$ amper-scripts lint ./source
```

### Validating project

Run commands to generally check the project (i.e. lint, format-check) all at
once. This is good for CI servers because it's fast, exits if anything fails,
and is oriented toward showing you where the error is:

```shellsession
$ amper-scripts validate
```

You can opt-out of individual steps as needed:

```shellsession
$ amper-scripts validate --no-lint
```

Use `amper-scripts help validate` for all available options.
