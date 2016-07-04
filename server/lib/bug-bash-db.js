const Datastore = require('nedb');
export default new Datastore({
  filename : '../db/bug-bash-tool',
  autoload : true
});
