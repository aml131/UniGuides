const router = require("express").Router()
const User = require("../models/User")
const Exp = require ('../models/Exp')
const Major = require ('../models/Major')



//create

//GET
router.get('/create', async(req,res)=>{
    try{
        const foundMajor = await Major.findById(req.params.majorId)
        res.render('exp/new.ejs', {foundMajor: foundMajor})
    }
    catch(error){
        console.log(error)
    }
})


//read
router.get('/:majorId', async(req,res)=>{
    try{
        const foundMajor = await Major.findById(req.params.majorId)
        res.render('exp/details.ejs', {foundMajor: foundMajor})
    }
    catch(error){
        console.log(error)
    }
})



module.exports = router