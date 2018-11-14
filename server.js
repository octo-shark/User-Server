const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', routes);

app.listen(port, () => console.log(`listening on port ${port}`));