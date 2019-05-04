// require the express module
const express = require('express');
// HTTP request logging middleware for node.js
const morgan = require('morgan');

const path = require('path');

const layout = require('./views/layout');

const models = require('./models');

// calling express creates an express application
const app = express();

// tell your app to use logging middleware on all incoming requests
// 'dev' makes it more informative-- e.g. color-coded
app.use(morgan('dev'));

// express.static is a built-in middleware function in express. we are telling it to serve up static, public files, like css stylesheets
app.use(express.static(path.join(__dirname, './public')));

// parses incoming requests with urlencoded payloads; allows us to access it on new req.body object
// extended is false because we want the values on the req.body object to be strings or arrays (not any other type)
app.use(express.urlencoded({ extended: false }));

// parses incoming requests with JSON payloads; allows us to access it on new req.body object
app.use(express.json());

app.get('/', (req, res, next) => {
  res.send(layout(''));
});

// assign your PORT
const PORT = 3000;

// this drops all tables then recreates them based on our JS definitions
// force true drops the tables; you only need this if you have changed columns/ structure of models. You can remove force: true when you do not need your tables to be dropped.
const init = async () => {
  await models.Page.sync({ force: true });
  await models.User.sync({ force: true });
  // start your server listening
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();

// in the Node.js module system, each file is treated as a separate module. https://nodejs.org/api/modules.html#modules_modules
// export app using module.exports
module.exports = app;
