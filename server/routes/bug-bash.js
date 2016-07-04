import express from 'express';
var router = express.Router();

import db from '../lib/bug-bash-db';

router.get('/', (req, res) => {
  db.find({}, (err, docs) => {
    res.send({
      records : err ? [] : docs
    });
  });
});

router.post('/new', (req, res) => {
  db.insert(req.body, () => {
    res.send('created!');
  });
});

router.put('/update', (req, res) => {
  db.update({ _id: req.body._id }, req.body.info, () => {
    res.send('updated!');
  });
});

router.delete('/destroy', (req, res) => {
  db.remove({ _id: req.body._id }, () => {
    res.send('removed!');
  });
});

export default router;
