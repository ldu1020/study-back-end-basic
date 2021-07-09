const http = require("http");
// const http2 = require('http2');

const server = http.createServer((req, res) => {
  console.log("incomming");
  const { url } = req;
  res.white("well");
  res.end();
});

server.listen(8080);
