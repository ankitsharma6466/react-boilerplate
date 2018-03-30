const commandLineArgs = require('command-line-args');
const componentGenerator = require('../container');

const optionDefinitions = [
  {
    name: 'name',
    alias: 'n',
    type: String
  },
  {
    name: 'route',
    alias: 'r',
    type: String
  }
];

const arg = commandLineArgs(optionDefinitions, { partial: true });
componentGenerator(arg.name, arg.route);