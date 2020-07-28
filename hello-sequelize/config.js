const defaultConfig = './config-default.js';
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';

const fs = require('fs');

let config = null;

if (process.env.NODE_ENV === 'test') {
    console.log(`load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`load ${defaultConfig}...`);
    config = require(defaultConfig);
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (error) {
        console.log(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;
