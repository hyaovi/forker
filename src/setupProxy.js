const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    proxy('http://localhost:3000/api', {
      changeOrigin: true,
      target: 'https://api.github.com'
      // pathRewrite: { '^/api': '' }
    })
  );
};
//https://api.github.com/repos/netlify/cli/forks
