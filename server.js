const express = require('express');
//creates an Express application instance.
const app = express();
// imports the dotenv module, which allows you to load env variables from a .env file into process.env.
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
//The path module provides utilities for working with file and directory paths.
const path = require('path');

// loads environment variables from a .env file into process.env.
dotenv.config();
// It parses the incoming request body and makes it available under the req.body property of the request object. So, when you use app.use(express.json()), you're telling your Express application to use the express.json() middleware for every incoming request, which allows you to easily handle JSON data in your routes.
app.use(express.json());

//This conditional block checks the value of the NODE_ENV environment variable. If it's set to 'local', it configures CORS middleware to allow requests from http://localhost:5173 with credentials. Otherwise, it configures CORS middleware to allow requests with credentials without any specific origin.
if (process.env.NODE_ENV === 'local') {
	app.use(
		cors({
			origin: 'http://localhost:5173',
			credentials: true,
		})
	);
} else {
	app.use(
		cors({
			credentials: true,
		})
	);
}

//This conditional block checks if the NODE_ENV environment variable is set to 'production'. If so, it serves static files from the './frontend/dist' directory and routes all other requests to the index.html file in that directory.
if (process.env.NODE_ENV === 'production') {
	//express.static() is middleware provided by Express to serve static files.
	app.use(express.static(path.join(__dirname, './frontend/dist')));
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, './', 'frontend', 'dist', 'index.html')
		);
	});
}

//This function asynchronously connects to the MongoDB database. Depending on the NODE_ENV value, it connects to either a local or production database specified by the environment variables LOCAL_DB_URI or MONGODB_URI, respectively.
const dbConnect = async () => {
	try {
		if (process.env.NODE_ENV === 'local') {
			await mongoose.connect(process.env.LOCAL_DB_URI);
			console.log('Local database is connected....');
		} else {
			await mongoose.connect(process.env.MONGODB_URI);
			console.log('production database is connected....');
		}
	} catch (error) {
		console.log('database connection failed');
	}
};

dbConnect();

//This line sets up a middleware for the Express application.
//It specifies that any requests to paths starting with /api should be routed through the designRoutes module.
//require('./routes/designRoutes') imports the routes defined in the designRoutes.js file
app.use('/api', require('./routes/designRoutes'));
app.use('/api', require('./routes/authRoutes'));

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`server up and running on port: ${port}`);
});
