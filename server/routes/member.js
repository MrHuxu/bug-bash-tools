import express from 'express';
var router = express.Router();

import db from '../lib/bug-bash-db';
import { fetchBugBashData } from '../lib/search-jira';

router.get('/', (req, res) => {
  var condition;
  console.log(req.query);
  switch (req.query.ids) {
    case undefined:
      condition = { _id: { $in: [] } };
      break;

    case 'ALL':
      condition = {};
      break;

    default:
      condition = { _id: { $in: req.query.ids } };
  }
  db.find(condition, (err, docs) => {
    fetchBugBashData(err ? [] : docs.map(doc => doc._id)).then(result => {
      res.send(result);
    });
  });
});

export default router;
