const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer(function(request, response) {
  let resource = request.url.substring(1);

  if (!/\.[0-9a-z]+$/i.test(resource)) {
    resource += '.html';
  }

  console.log(resource);

  fs.readFile(resource, function (error, data) {
    if (error) {
      response.writeHead(404);
      response.write('Not Found!');
    } else {
      response.writeHead(200);
      response.write(data);
    }

    response.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
