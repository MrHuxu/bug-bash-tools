import fs from 'fs';
import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import bugBash from './routes/bug-bash';
import member from './routes/member';

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
logger.token('reqBody', (req) => {
  return ' request: ' + JSON.stringify(req.body);
});
logger.token('remote-addr', (req) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});
if ('production' === process.env.NODE_ENV) {
  if (!fs.existsSync('./log')) fs.mkdirSync('./log');
  var logFile = fs.createWriteStream('./log/production.log', { flags: 'a' });
  app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"  :reqBody :status :res[content-length]', { stream: logFile }));
} else {
  app.use(logger(':method :url :reqBody :status :response-time ms - :res[content-length]'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : true
}));
app.use(express.static(path.join(__dirname, 'public')));

// => Rails => routes
app.use('/bug-bash', bugBash);
app.use('/member', member);

app.get('*', (req, res) => {
  res.render(path.resolve(__dirname, 'views', 'index.ejs'), {
    env   : process.env.NODE_ENV,
    title : 'Bug Bash Tool'
  });
});

export default app;
