module.exports = {
  apps: [{
    name: 'api',
    script: 'dist/app.js',
    autorestart: true,
    watch: 'dist/**/*.js',
    merge_logs: true,
  }]
}