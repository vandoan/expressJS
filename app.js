const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// const colors = ["red","blue","green"];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "pug");

app.get("/", (req, res) => {
	const name = req.cookies.username;
	// res.send("howdy, there.");
	if (name) {
		res.render("index", { name });	
	} else {
		res.redirect("hello");
	}
	
});

app.get("/cards", (req, res) => {
	// res.locals.prompt = "Where is San Juan del Sur?";
	res.render("card", { prompt: "Where is San Juan del Sur?", hint: "Central America." });  // Color
});

app.get("/hello", (req, res) => {
	const name = req.cookies.username;
	if (name) {
		res.redirect("/");	
	} else {
		res.render("hello");
	}
});

app.post("/hello", (req, res) => {
	console.dir(req.body);
	// res.json(req.body);
	res.cookie("username", req.body.username);
	res.redirect("/");
});
app.post("/goodbye", (req, res) => {
 	res.clearCookie("username"); 	
	res.redirect("/hello");
});

app.listen(3000, () => {
	console.log("The application is running on localhost: 3000.");
});  	// listen for a certain port
					
