const express = require('express');

const moment = require('moment');

const AccountModel = require('../../models/AccountModel');

const checkLoginMiddleWare = require('../../middleWares/checkLoginMiddleWare');


const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/account');
})
/* list */
router.get('/account', checkLoginMiddleWare, function (req, res, next) {

  //let accounts = db.get('accounts').value();
  AccountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) {
      res.status(500).send('Failed~~');
      return;
    }
    res.render('list', { accounts: data, moment: moment });
  })
});

router.get('/account/create', checkLoginMiddleWare, function (req, res, next) {
  res.render('create');
});

router.post('/account', checkLoginMiddleWare, (req, res) => {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if (err) {
      res.status(500).send('Failed');
      return;
    };
    res.render('chenggong', { msg: 'Success ~~~', url: '/account' });
  })
  /* let id = shortId.generate();
  db.get('accounts').unshift({ id: id, ...req.body }).write(); */
});

router.get('/account/:id', checkLoginMiddleWare, (req, res) => {
  let id = req.params.id;
  // db.get('accounts').remove({ id: id }).write();
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send('Failed');
      return;
    };
    res.render('chenggong', { msg: 'Deleted ~~~', url: '/account' });
  });
});

module.exports = router;
