module.exports = {
  "extends": ["ash-nazg", "plugin:node/recommended-script"],
  "env": {
    "node": false,
    "browser": true
  },
  settings: {
    polyfills: [
      'Promise'
    ]
  },
  "overrides": [
    {
      extends: ['plugin:node/recommended-module'],
      files: ['options/options.js']
    }
  ],
  "rules": {
  }
};
