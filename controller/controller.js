// const imageschema = require('../models/image')
// const fs = require("fs")
// const nodemailer = require("nodemailer")
// const SMTPConnection = require('nodemailer/lib/smtp-connection')
// const Alien = require('../models/alien')
// const { sync } = require('mkdirp')

// exports.uploadimage = (req, res) => {
//     try {
//         const files = new imageschema({
//             name: req.file.filename
//         });
//         files.save();
//         console.log('Uploaded Successfully')
//         res.status(200).send({
//             message: "UPLOAD SUCCESSFULLY",
//             data: req.file
//         })
//     }
//     catch {
//         res.send('error');
//     }
// }
// exports.deleteimage = (req, res) => {
//     try {
//         const DIR = "/data/node_class/CRUDJS-node-API/Uploads";
//         fs.unlinkSync(DIR + '/' + req.params.imagename);
//         console.log('successfully deleted', req.params.imagename);
//         return res.status(200).send('Successfully! Image has been Deleted');
//     } catch (err) {
//         return res.status(400).send(err);
//     }

// }
// exports.deletesignup = async (req, res) => {
//     console.log(req.params.id)
//     try {
//         const alien = Alien.findById(req.params.id)
//         const a1 = await alien.deleteOne()
        
//         res.redirect('../viewuser')



//     } catch (err) {
//         res.send('Error ' + err)
//     }
// }
// exports.updateSignIn = async (req, res) => {
//     try {
//         const d = req.body;
//         const alien = await Alien.findOneAndUpdate({ data: d.id }, d, { new: true })
//         const a1 = await alien.save()
//         res.json(a1)
//     } catch (err) {
//         res.send('Error')
//     }

// }
// exports.addsignup = async (req, res) => {
//     const alien = new Alien({
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         pwd: req.body.pwd,
//         cpwd: req.body.cpwd
//     })

//     try {
//         const a1 = await alien.save()
//         // res.json(a1)
//         //res.render('viewuser')
//         res.redirect('viewuser')
//     } catch (err) {
//         res.send('User not Registered' + err)
//     }
// }
// exports.adduser = (req, res) => {
//     res.render('adduser')

// }
// exports.viewuser = async (req, res) => {
//     try {
//         const aliens = await Alien.find()
//         // res.json(aliens)
//         res.render('viewuser', { data: aliens })
//     } catch (err) {
//         res.send('Error ' + err)
//     }
// }
// exports.databyid = async (req, res) => {
//     try {
//         const alien = await Alien.findById(req.params.id)
//         res.json(alien)
//     } catch (err) {
//         res.send('Error ' + err)
//     }
// }
// exports.getdetails = async (req, res) => {
//     try {
//         const a = await Alien.find()
//         res.send(a)
//     }
//     catch {
//         res.send('error=>' + err)
//     }
// }