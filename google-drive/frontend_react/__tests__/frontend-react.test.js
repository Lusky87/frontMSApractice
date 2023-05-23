'use strict';

const frontendReact = require('../lib/frontend_react');
const assert = require('assert').strict;

assert.strictEqual(frontendReact(), 'Hello from frontendReact');
console.info("frontendReact tests passed");
