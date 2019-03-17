const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    proxy('/repos', {
      changeOrigin: true,
      target: 'https://api.github.com'
    })
  );
};
