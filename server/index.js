"use strict";
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
require('./db/database');

let app = express();

app.use(express.static(path.resolve(__dirname +'/../public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'jade');

// API
app.use(require('./routes/hello-world'));
app.use(require('./routes/product'));
app.use(require('./routes/vendor'));
app.use(require('./routes/people'));

app.get('/', (req, res) => {
  res.render('index');
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`tech-matrix is listening on port ${port}`);
});






