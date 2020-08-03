const model = require('./model');

model.sync().then(() => {
    console.log('init db ok.');
    process.exit(0);
});

