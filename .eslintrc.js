module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb-base",
    "plugins": ["jest"],
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "rules": {
        "class-methods-use-this": ["off"],
        "global-require": ["off"],
        "import/no-dynamic-require": ["off"],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "no-underscore-dangle": ["off"],
        "no-param-reassign": ["off"],
    }
};