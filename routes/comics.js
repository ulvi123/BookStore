const express = require("express");
const router = express.Router();
const Comic= require("../models/comic");
const Comment = require("../models/comment");

//Index
router.get("/comics",(req,res) =>{
	Comic.find()
	.exec()
	.then((foundComics) =>{
		res.render("comics",{comics:foundComics});
	})
	.catch((err)=>{
		console.log(err);
		res.send(err);
	})
})

//Create a comics
router.post("/comics",(req,res) => {	
	const genre = req.body.genre.toLowerCase();
	const newComic = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		publisher: req.body.publisher,
		date: req.body.date,
		series: req.body.series,
		issue:req.body.issue,
		genre: req.body.genre,
		color: !!req.body.color,//double flip to turn true to false and then to true
		image: req.body.image
	}
	
	Comic.create(newComic)
	.then((comic)=>{
		console.log(comic);
		res.redirect("/comics");

	})
	.catch((err)=>{
		console.log(err);
		res.redirect("/comics");
	})
	
})
//New
router.get("/comics/new", (req,res) => {
	res.render("comics_news");
})


//Show
router.get("/comics/:id",(req,res)=>{
	Comic.findById(req.params.id)
	.exec()
	.then((comic)=>{
		Comment.find({comicId:req.params.id}, (err,comments)=>{
			if(err){
				res.send(err);
			}else{
				res.render('comics_show',{comic:comic,comments:comments});
			}
		})
	})
	.catch((err)=>{
		res.send(err);
	})
})



//Edit
router.get("/comics/:id/edit",(req,res)=>{
	//Get the book from DB
	Comic.findById(req.params.id)
	.exec()
	.then((comic) =>{
		//Render the edit form, that is passed in that book
		res.render("comics_edit",{comic:comic});
	})
})

//Update route
router.put("/comics/:id",(req,res)=>{
	const genre = req.body.genre.toLowerCase();
	const comicBody = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		publisher: req.body.publisher,
		date: req.body.date,
		series: req.body.series,
		issue:req.body.issue,
		genre: req.body.genre,
		color: !!req.body.color,//double flip to turn true to false and then to true
		image: req.body.image
	}
	
	Comic.findByIdAndUpdate(req.params.id,comicBody,{new: true})
	.exec()
	.then((updatedComic) => {
		console.log(updatedComic);
		res.redirect(`/comics/${req.params.id}`);
	})
	.catch((err)=>{
		res.send(err);
	})
})



//Delete
router.delete("/comics/:id",(req,res)=>{
	Comic.findByIdAndDelete(req.params.id)
	.exec()
	.then((deletedOne) =>{
		console.log("Deleted item:", deletedOne);
		res.redirect("/comics");
	})
	.catch((err)=>{
		res.send(err);
	})
})


module.exports = router;