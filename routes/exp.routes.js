const router = require("express").Router()
const User = require("../models/User")
const Exp = require ('../models/Exp')
const Major = require ('../models/Major')
const session = require("express-session")

//read
router.get('/:majorId', async (req, res) => {
  try {
    const foundMajor = await Major.findById(req.params.majorId)
    const foundExp = await Exp.find({ major: req.params.majorId }).populate('name')
    console.log(foundExp)
    res.render('exp/details.ejs', {
      foundMajor: foundMajor,
      foundExp: foundExp
    });
  } catch (error) {
    console.log(error);
  }
})

//create

//GET
router.get('/:majorId/new', async(req,res)=>{
    try{
        const foundMajor = await Major.findById(req.params.majorId)
        res.render('exp/new.ejs', {foundMajor: foundMajor})
    }
    catch(error){
        console.log(error)
    }
})

//POST
router.post('/:majorId', async(req,res)=>{
    try{
        req.body.name = req.session.user._id
        req.body.major = req.params.majorId
        await Exp.create(req.body)
        res.redirect(`/exp/${req.params.majorId}`)
    }
    catch(error){
        console.log(error)
    }
})

//user watch the posts he made only




module.exports = router