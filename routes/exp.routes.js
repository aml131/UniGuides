const router = require("express").Router()
const User = require("../models/User")
const Exp = require ('../models/Exp')
const Major = require ('../models/Major')
const session = require("express-session")

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
//update
router.get('/updateExp/:id',async(req,res)=>{
  try{
    const foundExp = await Exp.findById(req.params.id)
    res.render("exp/updateExp.ejs",{exp : foundExp}) 
  }
  catch(error){
    console.log(error)
  }
})

router.put('/updateExp/:expId', async (req,res)=>{
  try{
    const updatedExp = await Exp.findByIdAndUpdate(req.params.expId, req.body)
    res.redirect('/exp/myexp')
  }
  catch{
    console.log(error)
  }
})

//Delete

//user watch the posts he made only
router.get('/myexp' , async(req,res)=>{
  try {
    const myExp= await Exp.find({name:req.session.user._id}).populate('name')
   console.log(myExp)
    res.render('exp/myExp.ejs', {myExp: myExp})
  } catch (error) {
    console.log(error)
  }
})

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

module.exports = router