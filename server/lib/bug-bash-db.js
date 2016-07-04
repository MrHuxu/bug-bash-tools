import Datastore from 'nedb';
export default new Datastore({
  filename : './server/db/bug-bash-tool',
  autoload : true
});
