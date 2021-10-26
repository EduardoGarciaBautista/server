const mongoose = require('mongoose');

const initConnection = async () => {
    try {
        await mongoose.connect(createDbConnection(process.env.USER, process.env.PASSWORD));
        console.log('Database is online')
    } catch (e) {
        console.log(e);
        throw new Error('Error to init database connection');
    }
}

const createDbConnection = (...args) => {
    let finalString = process.env.STRING_CONNECTION;
    args.forEach((arg, i) => {
        finalString = finalString.replace(`{${i}}`, arg);
    });
    return finalString;
}

module.exports = {
    initConnection
}
