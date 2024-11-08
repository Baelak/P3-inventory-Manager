const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session'); // Added express-session
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Added Sequelize store
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars with a default layout and custom helpers
const hbs = exphbs.create({ 
  defaultLayout: 'main', 
  extname: '.handlebars',
  helpers: {
    extend: function () {
      const context = Object.assign({}, ...arguments);
      return context;
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configure sessions
const sess = {
  secret: 'inventoryappkym', 
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess)); // Added session middleware

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Correct static file path

// Routes
app.use(routes);

// Start server and sync database without force: true
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`💚 App listening on port ${PORT}!`);
  });
});
