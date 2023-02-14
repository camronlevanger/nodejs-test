const PORT = 3000;
const HOST = 'localhost';


process.on('uncaughtException', function(err) {
	console.log('UNHANDLED ERROR: ', err);
	process.exit(1);
});

process.on('unhandledRejection', function(err) {
	console.log('UNHANDLED PROMISE REJECTION: ', err);
	process.exit(1);
});



const app = require('./app');

module.exports = app.listen(PORT, HOST, function(err) {
	if (err) {
		throw err;
	}

	console.log(`Server listening on port: ${HOST}:${PORT}`);
});
