const express = require('express');
const app = express();
const config = require('./utils/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogRouter');
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
app.use('/api/blogs', blogRouter);

module.exports = app;