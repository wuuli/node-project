const assert = require('assert');
const hello = require('../app');

describe('#async hello', () => {
    describe('#asyncCalculate()', () => {

        it('#async function', async () => {
            let r = await hello();
            assert.strictEqual(r, 15);
        });
    })
})
