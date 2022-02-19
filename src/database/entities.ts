import path from 'path';
import glob from 'glob';

export default glob.sync(
  path.join(__dirname, '../lib/entity/**/*Entity.@(ts|js)'),
);
