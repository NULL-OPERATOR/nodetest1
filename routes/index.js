var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

// GET user list
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

// GET new user page
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

// POST to add User service
//
router.post('/adduser', function(req, res) {
  //setup initial db var
  var db = req.db;
  //set out collection
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  var collection = db.get('usercollection');
  //sumbit to db
  collection.insert({
    'username' : userName,
    'email' : userEmail
  }, function (err, doc) {
    if (err) {
      res.send("err-adding to database");
    } else {
      res.redirect('userlist');
    }
  });
});


module.exports = router;
