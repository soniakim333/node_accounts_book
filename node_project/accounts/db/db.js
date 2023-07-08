module.exports = function (success, error) {
    if (typeof error !== 'function') {
        error = () => console.log('failed~~');
    };

    const mongoose = require('mongoose');
    const { DBHOST, DBPORT, DBNAME } = require('../config/config');
    mongoose.set('strictQuery', true);
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    mongoose.connection.once('open', () => {
        success();
    });

    mongoose.connection.once('error', () => {
        error();
    });

    mongoose.connection.once('close', () => {
        console.log('close');
    });
};
