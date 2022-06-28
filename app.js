const express = require('express')
const mongoose = require('mongoose')
const multer= require('multer')
const fs= require('fs')
const path = require('path')
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const url = 'mongodb://localhost/learningMongo'
const ejs = require('ejs');
const app = express()
require("dotenv").config();
app.use(express.json());


mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
const alienRouter = require('./routes/aliens')
app.use('/aliens',alienRouter)

const imageRouter = require('./models/image')
const Storage = multer.diskStorage({
    destination:"Uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
});

const upload = multer({
    storage:Storage
}).single('testImage')

app.get("/images",(req,res)=>{
    res.send("Upload File");
})

function deleteimage(req, res) {
    try {
        const DIR = "/home/user/node session/CRUDJS/Uploads";
        fs.unlinkSync(DIR + '/' + req.params.imagename);
        console.log('successfully deleted', req.params.imagename);
        return res.status(200).send('Successfully! Image has been Deleted');
    } catch (err) {
        return res.status(400).send(err);
    }
}
app.delete('/delete/:imagename', deleteimage)

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage= new imageRouter  ({
                name: req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save()
            .then(()=>res.send("Successfully uploaded"),console.log("Successfully uploaded"),console.log(req.file.filename)
            ).catch(err=>console.log(err));
        }
    })
})

// This code is for deleting the image by giving path of a particular image....
// const path = './Uploads/Screenshot from 2022-04-07 10-57-17.png'
// try {
//   fs.unlinkSync(path)
//   console.error("  file removed  ")
//   //file removed
// } catch(err) {
//   console.error(err)
// }



// bcrypt.hash("qwertyuiop", 8)
//  .then(password => {
//     console.log(password);
//     bcrypt.compare("qwertyuiop", password)
//     .then(isEqual => {
//       console.log(isEqual); // true
//    });
// });
 




// var transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     require: true,
//     auth: {
//         user: 'madisyn.aufderhar96@ethereal.email',
//         pass: 'CkMe3NEvFYT1zwbu4Q'
//     }
// })
// var information = {
//     from: "madisyn.aufderhar96@ethereal.email",
//     to: "maurine.schmeler27@ethereal.email",
//     subject: "testmail",
//     text: "Hello, testing nodemailer!",
// };
// transporter.sendMail(information, function (error, info) {
//     if (error) {
//         console.log(error)
//     }
//     else {
//         console.log("successfully Sent Email", info.response)
//     }
// })

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
