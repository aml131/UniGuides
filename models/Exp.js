const mongoose = require("mongoose")

const expSchemma = new mongoose.Schema({
  
school:{
type: String,
enum: [
  "School of Business",
  "School of Creative Media",
  "School of Engineering",
  "School of ICT",
  "School of Logistics & Maritime Studies"
]
},
   major:{
    type: String,
    required:[true, "Please choose the major" ],
    enum: [
  "Accounting",
  "Animation and Visual Effects",
  "Banking and Finance",
  "Business Management",
  "Chemical and Industrial Processes Engineering",
  "Civil Engineering",
  "Communications and Networks",
  "Cybersecurity",
  "Data Analytic",
  "Database Systems",
  "Digital Filmmaking",
  "Digital Marketing",
  "Electrical Engineering",
  "Electromechanical Engineering",
  "Electronics Engineering",
  "Film & Animation",
  "Financial Technology",
  "Human Resource Management",
  "Information Systems",
  "Industrial Design and Process Engineering",
  "Industrial Instrumentation and Automatic Control Engineering",
  "International Logistics Management",
  "Marketing",
  "Mechanical Engineering",
  "Networking",
  "Programming",
  "Renewable and Clean Energy Engineering",
  "Supply Chain Management",
  "Visual Design",
  "Web Media"
]

   },
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