let mongoose = require('mongoose');
mongoose.Promise = Promise;

const options = {useNewUrlParser: true
};

mongoose.connect(process.env.MONGO_URL , options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection with database failed'));
db.once('open', () => {
    console.log('Connection with database succeeded')
});

exports.Database = db;