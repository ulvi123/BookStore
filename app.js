//---All Imports---//

//NPM imports
const express = require("express");
const app=express();
const body_parser= require("body-parser");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");

//Config imports
const config = require("./config");

//Model imports
const Comic = require("./models/comic");
const comment = require("./models/comment");

//Route imports
const comicRoutes = require("./routes/comics");
const commentRoutes = require("./routes/comments");
const mainRoutes = require("./routes/main");



//Dvelopment related imports for the projects
app.use(morgan("tiny"));

//Seeding the DB
const seed = require("./utils/dbSeed");
seed();


//Connect to DB
mongoose.connect(config.database.connection);

//Config(Express)
app.set("view engine","ejs");
app.use(express.static('Public'));

//Config(body parsing related)
app.use(body_parser.urlencoded({extended:true}));

//Method overriding config
app.use(methodOverride("_method"));


//Use routes
app.use(comicRoutes);
app.use(commentRoutes);
app.use(mainRoutes);


app.listen(3000,()=>{
	console.log("Server is up and running...");
})