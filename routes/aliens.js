const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer=require('nodemailer')

const generateJwt = async (jwtData, expTime) => {
    const secret=`${process.env.JWT_PRIVATE_KEY}`;
    try {
        return jwt.sign(jwtData, secret, {
            expiresIn: expTime,
        });
    } catch (error) {
        console.log('error', error);
        throw error;
    }
}
router.get('/addUser', async (req, res) => {
    res.render("addUser");
})

router.get('/loginuser', async (req, res) => {
    res.render("loginuser");
})

router.get('/userprofile', async (req, res) => {
    res.render("userprofile");
})
router.get('/forgot', async (req, res) => {
    res.render("forgot");
})

router.post('/reset',async (req, res) => {
    const { email } = req.body;
    //console.log(email)

    Alien.findOne({ email }, (err, user) => {
        if (err || !user) {
            console.log(email)

            return res.status(400).json({ error: "user with this email is does not exist" })
        }
        const ab=`${process.env.RESET_PASSWORD_KEY}`;
        const accessToken = jwt.sign({ id: user._id, email: user.email }, ab, { expiresIn: "5s" });
        console.log(accessToken)
        const data = {
            from: 'amit.kumar@antiersolutions.com',
            to: email,
            subject: "resetlink",
            html: `${process.env.CLIENT_URL}/resetpassword/${accessToken}`

        }
        Alien.findOneAndUpdate({ email: user.email }, { $set: { token: accessToken } }, { new: true }, (err, user) => {
            if (err) {
                return res.status(400).json({ error: 'Data not saved' })
            }
            else {
                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    require: true,
                    auth: {
                        user: 'amit.kumar@antiersolutions.com',
                        pass: 'AmIt@3452#'
                    }
                })
                transporter.sendMail(data, function (error, info) {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        // res.status(200).send(info.response)
                        console.log("successfully Sent Email", info.response)
                        res.redirect('./loginuser')

                    }
                })
            }
        });
    })
})



router.get('/viewuser', async (req, res) => {
    try {
        const aliens = await Alien.find()
        res.render('viewuser', { data: aliens })
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const alien = await Alien.findByIdAndUpdate({ _id:req.params.id },req.body, { new: true })
        const a1 = await alien.save()
        res.redirect('../viewuser')

    } catch (err) {
        res.send('Error', err)
    }
})

router.get('/edit/:id', async (req, res) => {
    Alien.findById({ _id: req.params.id }).then((data) => {
        res.render('./updateuser', { data })
    })
});



router.post('/login' , async (req, res) => {
    const { email, pwd } = req.body;
    const user = await Alien.findOne({ email });
    if (user) {
        const verify = await bcrypt.compare(pwd, user.pwd);
        if (verify) {
            const token = await generateJwt({
                id: user._id,
                email: user.email,
            }, (60 *60 *24));
            console.log("token is", token)
            res.status(200).send(token)
            res.render('./userprofile')
            return ({ success: true, message: 'Login successfully!', });
        }
        return ({ success: false, message: 'Entered email or password is not valid!', });
    }
    return ({ success: false, message: 'user is not registerd!' }); 
})

router.get('/delete/:id', async (req, res) => {
    try {
        const alien = Alien.findById(req.params.id)
        const a1 = await alien.deleteOne()
        res.redirect('../viewuser')
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/', async (req, res) => {
    try {
        const aliens = await Alien.find()
        res.json(aliens)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.get('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        res.json(alien)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/add', async (req, res) => {
    const saltRounds = 8;
    const hash = await bcrypt.hash(req.body.pwd, saltRounds);
    const alien = new Alien({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        pwd: hash,
        cpwd: req.body.cpwd
    })

    try {
        const a1 = await alien.save()
        console.log(a1)
        res.redirect('./viewuser')
    } catch (err) {
        res.send('Error')
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        alien.email = req.body.email
        const a1 = await alien.save()
        res.json(a1)
    } catch (err) {
        res.send('Error')
    }

})
router.delete('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        const a1 = await alien.remove()
        res.json(alien)
    } catch (err) {
        res.send('Error ' + err)
    }
})

module.exports = router