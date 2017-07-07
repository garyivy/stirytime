const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./api.js'); 
const app = express(); 


// Setup REST API
const dbName = 'stiryDB';
var options = {
  server: {
      socketOptions: {
          socketTimeoutMS: 30000,
          connectTimeoutMS: 30000
      }
  }  
};
const connectionString = 'mongodb://localhost:27017/' + dbName;
//const connectionString = 'mongodb://admin:Admjuynhyy@cluster0-shard-00-00-wo3z4.mongodb.net:27017,cluster0-shard-00-01-wo3z4.mongodb.net:27017,cluster0-shard-00-02-wo3z4.mongodb.net:27017/Stirytime?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.connect(connectionString, options, function(error, db){
    if(error) {
        fs.appendFile('diagnostic.log', 'Unable to connect to mongoDb', function (loggingError) {
            if (loggingError) {
                console.error(loggingError);
            }
        });        
    
        console.log('Unable to connect to DB');
        console.log(error);
    } else {

        fs.appendFile('diagnostic.log', 'Connected to mongoDb', function (loggingError) {
            if (loggingError) {
                console.error(loggingError);
            }
        });  

        console.log('Connected to DB!');
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', api); 

// Setup serving static app 
const fileDirectory = __dirname.replace('server','build');
app.get(['/', 'signin', 'reset', 'wait'], function ( request, response ) {
    response.sendFile(fileDirectory + '/index.html');
});
app.get('/app.js', function ( request, response ) {
    response.sendFile(fileDirectory + '/app.js');
});
app.get('/app.css', function ( request, response ) {
    response.sendFile(fileDirectory + '/app.css');
});
app.get('/fontawesome*', function ( request, response ) {
    try
    {
        response.sendFile(fileDirectory + request.originalUrl);
    }
    catch( error ) {
        response.sendStatus(404);
    }
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.listen(3001, () => console.log('server listening on 3001'));
