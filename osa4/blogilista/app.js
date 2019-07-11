const express = require('express');
const app = express();
const config = require('./utils/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogRouter');
const userRouter = require('./controllers/userRouter');
const loginRouter = require("./controllers/login");
const middleware = require('./utils/middleware');



mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    //console.log('Connected to database');
  }).catch((error) => {
    console.log('Connection to database failed', error);
});

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.errorHandler);

module.exports = app;