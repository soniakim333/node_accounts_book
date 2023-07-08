var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

router.get('/reg', (req, res) => {
    res.render('auth/reg');
});

router.post('/reg', (req, res) => {
    UserModel.create({ ...req.body, password: md5(req.body.password) }, (err, data) => {
        if (err) {
            res.status(500).send('failed');
            return;
        };
        res.render('chenggong', { msg: 'register success.', url: '/login' });
    });
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
        if (err) {
            res.status(500).send('failed,try again later');
            return;
        };
        if (!data) {
            return res.send('username or password wrong.');
        };

        req.session.username = data.username;
        req.session._id = data._id;
        res.render('chenggong', { msg: 'login success.', url: '/account' });
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy(()=>{
        res.render('chenggong', { msg: 'logout success.', url: '/login' });
    });
});

module.exports = router;
