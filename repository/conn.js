var db_name = 'phd_ponto';
// Bring Mongoose into the app
var mongoose = require( 'mongoose' ),
credentials = "admin:eYT1V7LArmf8",

//provide a sensible default for local development
dbURI = 'mongodb://127.0.0.1:27017/' + db_name;

//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  dbURI = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}
// Create the database connection
console.log(dbURI);
mongoose.connect(dbURI);
 
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});
 
// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});
 
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});
 
// When the connection is open
mongoose.connection.on('open', function () {
  console.log('Mongoose default connection is open');
});
 
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


// var Cat = mongoose.model('Cat',{name:String});
// var kitty = new Cat({name:"Kitty"});
// kitty.save(function(err, data){
// 	if(err){
// 		console.log("Erro: ", erro);
// 	}
// 	console.log('meow', data);

// });

module.exports = mongoose.connection;