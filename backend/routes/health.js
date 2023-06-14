const router = require('express').Router()
let Health = '../models/health.model.js'

router.route('/').get((req,res) => {
    Health.find()
    .then(health => res.json(health))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req,res) => {

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const temperature = req.body.temperature
    const phonenumber = req.body.phonenumber

    const newHealthDeclaration = new Health({firstname, lastname, email, temperature, phonenumber})

    newHealthDeclaration.save()
        .then(newHealthDeclaration => res.json('New Record Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;