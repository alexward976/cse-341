const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

let _db;

const initDb = (callback) => {
    if(_db) {
        console.log('DB is already intialized!');
        return callback(null, _db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
}

const getDb = () => {
    if(!_db) {
        throw Error('DB not initalized!');
    }
    return _db;
}

module.exports = { initDb, getDb }