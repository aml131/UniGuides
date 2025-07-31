const router = require("express").Router()

//Read
router.get('/',async(req,res)=>{
    try{
        res.render('home/home.ejs')

    }
    catch(error){
        console.log(error)
    }
})

module.exports = router