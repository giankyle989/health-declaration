const router = require('express').Router();

let UserModel = require('../models/user.model');


router.route('/').get((req, res)=> {

    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error :' + err));

});

router.route('/add').post((req,res) => {

    const email = req.body.email;
    const fullname = req.body.fullname;
    const password = req.body.password;

    const newUser = new UserModel({email, fullname, password});

    newUser.save()
    .then(users => res.json('New User Added!'))
    .catch(err => res.status(400).json('Error :' + err));
})


module.exports = router