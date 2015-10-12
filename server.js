var redis = require('redis');
var client = redis.createClient();
var http = require('http');
var fs = require('fs');
var indexHtml = fs.readFileSync(__dirname + '/public/index.html');
var port = process.env.PORT || 8000;

function handler(request, response){
  var url = request.url;
  var urlArray = url.split('/');
  var frontInput = urlArray[2];
  if (request.method === 'GET') {
    if (url === '/') {
    response.writeHead(200,{"Content-Type": "text/html"});
    response.end(indexHtml);
    }
    else if (urlArray [1] === 'getposts') {
    client.lpush('favourites', frontInput, function(error, reply){

    });
    client.lrange('favourites', 0,-1, function(error, reply){
      var list = reply.toString();
        console.log(list);
        response.end(list);
    });
    response.writeHead(200,{"Content-Type": "text/html"});
    }
  }
  else {
    response.writeHead(404, "This is not the page you are looking for..");
    response.end();
  }
}
http.createServer(handler).listen(port);
console.log('node http server listening on http://localhost:' + port);
