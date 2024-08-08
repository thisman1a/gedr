const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Proxy all requests to the Xray server
app.use('/', createProxyMiddleware({
  target: 'http://213.238.182.113:9001',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/', // Keep the path as '/'
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('X-Forwarded-For', req.ip);
  }
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
