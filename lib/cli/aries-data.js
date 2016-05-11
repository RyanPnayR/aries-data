#!/usr/bin/env node

// Babel up
require('babel-core/register');
require('babel-polyfill');

// Parse arguments.
var argv = require('minimist')(process.argv.slice(2), {
    string: ['repo'],
});

// Get boot params and fire it up.
require('./execute').default(argv).catch(function(e) {
    console.error(e);
});
