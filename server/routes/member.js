var express = require('express');
var router = express.Router();

import db from '../lib/bug-bash-db';
import { fetchBugBashData } from '../lib/search-jira';

router.get('/', (req, res) => {
  db.find({}, (err, docs) => {
    fetchBugBashData(docs.map(doc => doc._id)).then(result => {
      res.send(result);
    });
  });
});

export default router;
