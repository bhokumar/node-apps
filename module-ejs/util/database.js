const mongodb = require('mongodb');

let _db = null;

const mongoConnect = (cb) => {

    const mongoClient = mongodb.MongoClient;

    const uri = "mongodb+srv://user1:H07a3BFRwntZ9GrW@cluster0-8slms.mongodb.net/test?retryWrites=true&w=majority";

    mongoClient.connect(uri)
        .then(client => {
            console.log("Connected!");
            _db = client.db();
        }).then(err => {
            console.log(err);
            throw err;
        })
}

const getDb = () => {
    if (_db) {
        return _db;
    }

    throw "No database found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb