const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (req, res, next) => {
  Blog
    .find({})
    .then((blogs) => {
      res.json(blogs);
    });
});

blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((savedBlog) => {
      res.status(200).send(savedBlog);
    }).catch(error => console.log('post failed'));
});

module.exports = blogRouter;