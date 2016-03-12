var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//-------------------------------------------------------------------------------
// INIT
//-------------------------------------------------------------------------------
// Init express
var app = express();
// Json parser
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());

app.post('/notify', function(request, response) {
  response.send();
});

app.post('/single', function(request, response) {
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.send(JSON.stringify({jsonrpc: "2.0", id: request.body.id, result: "Hey Baby"}))
});

app.post('/multi', function(request, response) {
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.send(JSON.stringify([
    {jsonrpc: "2.0", id: request.body[0].id, result: {"value": "start-successful", collectDate: "2016-03-03"}},
    {jsonrpc: "2.0", id: request.body[1].id, result: {"value": "server-started", collectDate: "2016-03-03"}},
    {jsonrpc: "2.0", id: request.body[2].id, result: {"value": "Hello World!", collectDate: "2016-03-03"}}
  ]))
});

/**
 * This sends a 400-BAD REQUEST with invalid params error
 */
app.post('/single-error', function(request, response) {
  response.statusCode = 400;
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.send(JSON.stringify({jsonrpc: "2.0", id: request.body.id, error: {code: -32602, message: "Invalid params"}}));
});

/**
 * This sends a malformed object
 */
app.post('/single-illegal', function(request, response) {
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.send(JSON.stringify({jsonrpc: "2.0"}));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


