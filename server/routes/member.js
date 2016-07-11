import express from 'express';
var router = express.Router();

import db from '../lib/bug-bash-db';
import { fetchBugBashData } from '../lib/search-jira';

router.get('/', (req, res) => {
  db.find({ _id: { $in: req.query.ids || [] } }, (err, docs) => {
    fetchBugBashData(err ? [] : docs.map(doc => doc._id)).then(result => {
      res.send(result);
    });
  });
});

export default router;
