import path from 'path'
import glob from 'glob'

export default glob.sync(path.join(__dirname, './**/*.@(ts|js)'))
  .filter(path => !path.includes('index'))