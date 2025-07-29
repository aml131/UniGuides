const mongoose = require("mongoose")

const expSchemma = new mongoose.Schema({
  
name:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
}],
    
   major:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Major',
    required: true
   }],


university:{
type: String,
enum : [
 "Bahrain Polytechnic",
  "University of Bahrain",
  "Arab Open University",
  "Applied Science University",
  "Gulf University",
  "Royal University for Women",
  "Ahlia University",
  "University of Strathclyde",
  "British University of Bahrain",
  "American University of Bahrain",
  "University College of Bahrain",
  "University of Technology Bahrain"
]
},

fees : {
type:Number
},

challanges: {
type: String
},

aboutMajor: {
    type: String
},

contact: {
type: String
},

created:{
    type: Date,
    Default: Date.now
}


})

const Exp = mongoose.model('Exp', expSchemma)

module.exports = Exp