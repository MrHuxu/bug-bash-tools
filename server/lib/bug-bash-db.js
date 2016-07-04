const Datastore = require('nedb');
module.exports = new Datastore({
  filename: './bug-bash-db',
  autoload: true
});
