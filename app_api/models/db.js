const mongoose = require('mongoose');

let dbURI = "mongodb+srv://rajith:rajith0627@cluster0.qnjpb.mongodb.net/myMovieDB?retryWrites=true&w=majority"; //Remote DB connection

// if (process.env.NODE_ENV === 'production') {
//     dbURI = "mongodb+srv://rajith:rajith0627@cluster0.qnjpb.mongodb.net/myMovieDB?retryWrites=true&w=majority"; //Remote DB connection
// }

mongoose.connect(dbURI, { dbName: 'myMovieDB', useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});


const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};


process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./petItems');