const Major = require('../models/Major')
const router = require("express").Router()

//Create
router.get("/new",(req,res)=>{
    res.render("majors/new.ejs")
})

router.post("/",async(req,res)=>{
    try{
        const createdMajor = await Major.create(req.body)
        res.redirect("/majors/new")
    }
    catch(error){
        console.log(error)
    }
})
//Read
router.get('/',async(req,res)=>{
    try{
        const allMajors = await Major.find()
        res.render('majors/all.ejs', {allMajors: allMajors})

    }
    catch(error){
        console.log(error)
    }
})





module.exports = router