const Datastore = require('nedb');
export default new Datastore({
  filename : './bug-bashes',
  autoload : true
});
