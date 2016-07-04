var express = require('express');
var router = express.Router();

var db = require('../lib/bug-bash-db');

router.get('/', (req, res) => {
  db.find({}, (err, docs) => {
    res.send({
      records: docs
    });
  });
})

router.post('/new', (req, res) => {
  db.insert(req.body.info, (err, newDocs) => {
    res.send('created!');
  });
});

router.put('/update', (req, res) => {
  db.update({ _id : req.body.info._id }, () => {
    res.send('updated!');
  });
});

router.delete('/destroy', (req, res) => {
  db.remove({ _id : req.body.info._id }, () => {
    res.send('removed!');
  });
});

module.exports = router;
