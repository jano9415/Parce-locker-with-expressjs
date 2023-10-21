const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const port = 8080;

const parcelHandlerProxy = createProxyMiddleware('/parcelhandler', {
  target: 'http://localhost:8081', // Célszerver (parcel-handler-service)
  changeOrigin: true,
});

const authenticationProxy = createProxyMiddleware('/auth', {
    target: 'http://localhost:8082', // Célszerver (authentication-service)
    changeOrigin: true,
  });

  const notificationProxy = createProxyMiddleware('/notification', {
    target: 'http://localhost:8083', // Célszerver (notification-service)
    changeOrigin: true,
  });

  const statisticsProxy = createProxyMiddleware('/statistics', {
    target: 'http://localhost:8084', // Célszerver (statistics-service)
    changeOrigin: true,
  });

app.use('/parcelhandler', parcelHandlerProxy);
app.use('/auth', authenticationProxy);
app.use('/notification', notificationProxy);
app.use('/statistics', statisticsProxy);

app.listen(port, () => console.log('app listening on port ' + port));