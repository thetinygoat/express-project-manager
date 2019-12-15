const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
// instantiate app
const app = express();

// define middleware
// helmet middleware
app.use(helmet());
//cors middleware
app.use(cors());
// parse json data
app.use(express.json());
// parse url encoded data
app.use(express.urlencoded({ extended: false }));
// logging middleware
if (process.env.NODE_ENV === "production") {
	app.use(morgan("combined"));
} else {
	app.use(morgan("dev"));
}
/* route registration
eg.
const authRoutes = require("./api/routes/auth");
*/
module.exports = app;