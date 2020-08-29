# Singular Pipes

This package contains pipes for Singular framework, installed from `npm install @singular/pipes`.

# Setup

  1. Clone [repo](https://github.com/singularframework/core) from the appropriate branch
  2. Inside repo run `npm start` and then `sudo npm link` to create a global symlink
  3. Install dependencies inside `@singular/pipes` repo: `npm install`
  4. Whenever a dependency is installed, the symlink needs to be recreated: `npm link @singular/core`

# NPM Scripts

  - Build from source: `npm start`
  - Build documentation: `npm run docs`
  - Run tests: `npm test`
