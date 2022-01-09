const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
let home=fs.readFileSync("index.html","utf-8")
let contactpg=fs.readFileSync("contact.html","utf-8")
// const body=require("body-parser")
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/UmangDanceAcademy');
//   const DanceData = await contact.find();
// console.log(DanceData);
  
}
// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    Address:String,
    Email:String,
    contact_number:String,
    age:String
  });
  contactSchema.methods.speak = function speak() {
    const greeting = this.name
    console.log(greeting);
    
  };
  
  const contact = mongoose.model('contact', contactSchema);







// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF



// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).end(home);
})
app.get('/contact.html', (req, res) => {

    res.status(200).end(contactpg);
})
app.post('/contact', (req, res) => {
const myData=new contact(req.body)
myData.save().then(()=>{
   console.log("File saved to the Database")
}).catch(()=>{
    res.status(400).send("not sent")
})
    res.status(200).render('contact.pug');
    fs.writeFileSync("danceDATA.txt",JSON.stringify(req.body))
  
 
})



// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});