const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const storyRouter = require('./routes/story.router.js')
const commentsRouter = require('./routes/comments.router.js')
const categoriesRouter = require('./routes/categories.router.js')
const publicStoryRouter = require('./routes/publicstory.router.js')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/story', storyRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/category', categoriesRouter);
app.use('/api/publicstory', publicStoryRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
