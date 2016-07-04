var express = require('express');
var router = express.Router();

import db from '../lib/bug-bash-db';
import { fetchBugBashData } from '../lib/search-jira';

router.post('/', (req, res) => {
  db.find(req.body.ids ? { _id: { $in: req.body.ids } } : {}, (err, docs) => {
    fetchBugBashData(err ? [] : docs.map(doc => doc._id)).then(result => {
      res.send(result);
    });
  });
});

export default router;
