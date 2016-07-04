var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  db.find({}, (err, docs) => {
    res.send({
      records: docs
    });
  });
})
