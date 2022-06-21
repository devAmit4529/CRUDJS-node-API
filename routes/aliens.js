const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')

router.get('/addUser', async (req, res) => {
    res.render("addUser");
})

router.get('/viewuser', async (req, res) => {
    try {
        const aliens = await Alien.find()
        res.render('viewuser', { data: aliens })
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.post('/updatealien', async (req, res) => {

    try {
        const alien = await Alien.findByIdAndUpdate(req.params.id)
        res.render('./viewuser', { data: alien })
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/edit/:id', async (req, res) => {
    console.log(req.body)
    Alien.findById({ _id: req.params.id }).then((data) => {
        // console.log(data)
        res.render('./updateuser', { data })
    })
});

router.post('/update', async (req, res) => {
    const alien = new Alien({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        pwd: req.body.pwd,
        cpwd: req.body.cpwd
    })

    try {
        const a1 = await alien.save()
        // res.json(a1)
        res.redirect('viewuser')
        // res.send('data inserted')
    } catch (err) {
        res.send('Error')
    }
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
    const alien = new Alien({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        pwd: req.body.pwd,
        cpwd: req.body.cpwd
    })

    try {
        const a1 = await alien.save()
        // res.json(a1)
        res.redirect('viewuser')
        // res.send('data inserted')
    } catch (err) {
        res.send('Error')
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        alien.tech = req.body.tech
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