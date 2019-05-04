const app = require('./app');
const models = require('./models');

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
