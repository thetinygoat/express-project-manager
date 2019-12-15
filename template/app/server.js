const app = require("./index");
// add database configuration
/*
eg.
const mongoose = require("mongoose");
const config = require("./config");
// handle SIGINT
process.on("SIGINT", () => {
	mongoose.disconnect().then(() => {
		console.log(`disconnected database ${config.mongo.db}`);
	});
});

// connect to database
const mongoURL = mongodb://this_is_a_database_url
mongoose
	.connect(mongoURL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log(`connected to database: ${config.mongo.db}`);
		app.listen(config.express.port, () => {
			console.log("started server");
		});
	})
	.catch(err => {
		throw new Error(err);
		process.exit(1);
	});
	*/