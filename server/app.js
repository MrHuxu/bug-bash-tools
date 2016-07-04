import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

import { fetchBugBashData } from './lib/fetch-jira';

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
logger.token('reqBody', (req) => {
  return ' request: ' + JSON.stringify(req.body);
});
app.use(logger(':method :url :reqBody :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/bugBash', (req, res) => {
  fetchBugBashData(req.body).then((result) => console.log(result));
  res.send('hehe');
});

app.get('*', (req, res) => {
  res.render(path.resolve(__dirname, 'views', 'index.ejs'), { title: 'Bug Bash Tool' });
});

export default app;
