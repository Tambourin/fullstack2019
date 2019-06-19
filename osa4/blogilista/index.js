const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogRouter');
const middleware = require('./utils/middleware');
const Blog = require('./models/blog');

//app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database');
  }).catch((error) => {
    console.log('Connection to database failed', error);
});

app.use('/api/blogs', blogRouter);

app.listen(config.PORT);