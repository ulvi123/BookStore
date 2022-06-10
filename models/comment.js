const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	user:String,
	text:String,
	comicId:{
		type:mongoose.Schema.Types.ObjectId,
	    ref:"Comic"
	}
});

const Comment  = mongoose.model("comment", commentSchema);
module.exports = Comment;