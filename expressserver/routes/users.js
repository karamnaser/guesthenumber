var express = require('express');
var router = express.Router();
const { getUsers, sendUserData } = require('../api/userapi/userapi');
const { sendData, getgamenumbers, sendgamenumbers } = require('../api/gameapi/gameapi');
/* GET users listing. */
router.get('/:userid', function(req, res, next) {
    getUsers(req.params.userid).then(users => {
        res.status(200).json(users)
    })
});

router.get('/currentgame/:gameid', function(req, res, next) {
    getgamenumbers(req.params.gameid).then(gamenumbers => {
        res.status(200).json(gamenumbers)
    })
});

//post request
router.post('/', function(req, res, next) {
    console.log(req.body)
    sendUserData(req.body.name).then(() => {
        res.status(200).json({ msg: "data was sent sucssecfuly" })
    })
});

router.post('/currentgame', function(req, res, next) {
    sendData({
        userid: req.body.userid,
        minnumber: req.body.minnumber,
        maxnumber: req.body.maxnumber,
        choosennumber: req.body.choosennumber
    }).then(users => {
        res.status(200).json({ msg: "data was sent sucssecfuly" })
    })
});

router.post('/currentgamenumbers', function(req, res, next) {
    console.log(req.body)
    sendgamenumbers({
        gameid: req.body.gameid,
        number: req.body.number
    }).then(users => {
        res.status(200).json({ msg: "data was sent sucssecfuly" })
    })
});

module.exports = router;