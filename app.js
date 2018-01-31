var express = require('express');
var compression = require('compression');
var app = express();

var root = __dirname + '/';
var root_dist = __dirname + '/dist';

var bodyParser = require('body-parser');
let src = '/build';

app.get('/', function (req, res) {
  res.sendFile(root + src + '/index.html');
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json());
app.use(compression());
app.use('/', express.static(root + src));
app.use('/favicon.ico', express.static(root + src + '/favicon.ico'));

app.all('/favicon.ico', function (req, res) {
  res.sendFile(__dirname + '/src/assets/favicon.png');
});

app.get('/example_file', function (req, res) {
  res.sendFile(__dirname + '/test.txt');
});

app.get('*', function (req, res) {
  res.sendFile(root + src + '/index.html');
});


var port = process.env.PORT || (process.env.PROD ? 3001 : 3001);
app.listen(port);

console.log('server starter port ', port);
