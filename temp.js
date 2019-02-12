var t1 = Date.now();
require('bcryptjs')
  .hash('hello', 5)
  .then(hash => console.log(hash, Date.now() - t1));
