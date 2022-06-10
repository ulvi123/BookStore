/*
//Comics 
GET    /comics/new -- NEW ROUTE
POST         /comics-- CREATE

//Comments
GET    /comics/:id/comments/new- NEW  
POST   /comics/:id/comments-     Create

*/

const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.js");



//New comment- Show form ,
router.get("/comics/:id/comments/new", (req, res) =>{
	res.render("comments_new",{comicId: req.params.id});
})

//Create Comment-Actually update the DB
router.post("/comics/:id/comments",(req,res)=>{
	//create
	console.log("The route is being hit");
	Comment.create({
		user:req.body.user,
		text:req.body.text,
		comicId:req.body.comicId
	})
	.then((newComment)=>{
		console.log(newComment);
		res.redirect(`/comics/${req.body.comicId}`)
	})
	.catch((err)=>{
		console.log(err);
		res.redirect(`/comics/${req.body.comicId}`)
	})
})

module.exports = router;