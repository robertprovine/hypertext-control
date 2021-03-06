/* setting up express */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

/* get environment variables from .env file */
require('dotenv').config();

const app = express();

/* importing routes */
const projectRoutes = require('./routes/projects');
const componentRoutes = require('./routes/components');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users')
const htcRoutes = require('./routes/htc')
const zipRoutes = require('./routes/zip')

/* setting up port & listen */
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

/* setting up views */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* setting static file */
app.use('/static', express.static(path.join(__dirname, 'public')));
/* setting up logger */
app.use(logger('dev'));
app.use(cookieParser());
/* setting up body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/* setting routes */
app.get('/', function(req, res) {
  res.send('Hello');
  // res.sendFile(__dirname + '/public/index.html');
});

app.use('/api/projects', projectRoutes);
app.use('/api/components', componentRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/htc', htcRoutes);
app.use('/zip', zipRoutes);

/* handling 404 */
app.get('*', function(req, res) {
  res.status(404).send({ message: 'Oops! Not found.' });
});
