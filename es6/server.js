const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer(function(request, response) {
  const logs = [];
  let resource = request.url.substring(1);
  let parts;

  logs.push(`request: ${resource}`);

  // if there is not an extension serve the html page
  if (!/\.[0-9a-z]+$/i.test(resource)) {
    parts = resource.split('/', 1);

    resource = `apps/${parts[0]}/index.html`;
  }

  logs.push(`served: ${resource}`);

  fs.readFile(resource, function (error, data) {
    if (error) {
      response.writeHead(404);
      response.write('Not Found!');

      logs.push('statusCode: 404');
    } else {
      response.writeHead(200);
      response.write(data);

      logs.push('statusCode: 200');
    }

    console.log(logs.join(' - '));

    response.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
