//Routes
const express=require("express");
const router = express.Router();



router.get("/", (req,res)=>{
	res.render("landing");
})

//Put start button and customize the page when it is clicked it will refer to the books page


module.exports = router;