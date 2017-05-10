var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );

//uses
app.use( bodyParser.json() );
app.use( express.static( 'public' ) );

app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
  });

  app.get( '/', function( req, res ){
    res.sendFile( path.resolve( 'public/index.html' ) );
    });

// 27017 is default mongo port
mongoose.connect( 'localhost:27017/meanie' );

var ourSchema = mongoose.Schema({
  name: String,
  location: String
  });

var ourModel = mongoose.model( 'ourModel', ourSchema );

app.get( '/getRecords', function( req, res ){
    console.log("in get records route on server");
// get and send back all the things
    ourModel.find().then( function( data ){
      res.send( data );
  });
});


app.post( '/testPost', function( req, res ){
  console.log( 'req.body.name: ' + req.body.name );
  console.log( 'req.body.location: ' + req.body.location );

// retrieved the req.body
// putting it into an object to be saved in the db
  var recordToAdd={
    name:req.body.name,
    location:req.body.location
  };

  console.log( 'record to add: ' + recordToAdd );

// create new record
  var newRecord = ourModel( recordToAdd );
  newRecord.save().then(function(){
    res.sendStatus(200);
  });
  });
