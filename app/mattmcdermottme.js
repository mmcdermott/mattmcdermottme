var http = require('http');
var fs   = require('fs');
var path = require('path');

var serverPort = 8080;

var server = http.createServer(function(request,response) {
  console.log('request starting...');

  var extname  = path.extname(request.url);
  var basePath = path.basename(request.url);
  var filePrefix = '';
  if (basePath == '') {
    basePath = 'index.html';
  }
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      filePrefix  = 'assets/javascripts/';
      break;
    case '.css':
      contentType = 'text/css';
      filePrefix  = 'assets/stylesheets/'
      break;
  }
  var filePath = filePrefix + basePath;
  console.log('extname: ' + extname);
  console.log('filePath: ' + filePath);
  console.log('url: ' + request.url);
  response.writeHead(200, {'Content-Type': contentType});

  fs.readFile(filePath, function(err, contents) {
    if (err) {
      console.log(err);
      response.writeHead(500);
      response.end();
    } else {
      console.log(contents);
      response.end(contents, 'utf-8');
    }
  });
}).listen(8080);
