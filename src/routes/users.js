// define router for routing
const router = require('express').Router();
const User = require('../dataBase/models/user.model');

// get users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(e => res.status(400).json('error :' + ' ' + e));
});
router.route('/add').post((req, res) => {
    const {
        userName
    } = req.body;
    const newUser = new User({
        userName
    });
    newUser.save()
        .then(user => {
            res.json(user).status(200);

        }).catch(e => {
            res.json('error: ' + e).status(400);
        });
});


module.exports = router;