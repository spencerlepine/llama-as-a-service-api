const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer = { stop: () => { } }

exports.dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();

  const uri = await mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

exports.dropDatabase = async () => {
  await mongoose.connection.dropDatabase(function (err, result) {
    if (err) throw err;
    console.log('database dropping was scheduled');
  });
}

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};