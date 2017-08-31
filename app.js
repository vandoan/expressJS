const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// const colors = ["red","blue","green"];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static('public'));

app.set("view engine", "pug");

const mainRoutes = require("./routes"); // defaults to /routes/index.js
const cardRoutes = require("./routes/cards");

app.use(mainRoutes); 
app.use("/cards", cardRoutes);

app.use((req, res, next) => {
	console.log("One");
	const err = new Error("Oh, noes!");
	next();
	err.status = 500;
	//next(err);
});

app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.error = err;
	res.status(err.status);
	res.render("error");
});


app.listen(3000, () => {
	console.log("The application is running on localhost: 3000.");
});  	// listen for a certain port
					
