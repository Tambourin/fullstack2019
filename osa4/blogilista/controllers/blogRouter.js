const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    if (blogs) {
      console.log(blogs);
      res.json(blogs).status(200);
    } else {
      res.status(404);
    }
  } catch (exception) {
    console.log(exception);
  }
});

blogRouter.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog).status(200);
  } catch (exception) {
    console.log("Tietyn blogin haku ideellä ei onnistunut");
  }
});

blogRouter.post("/", async (req, res, next) => {
  const users = await User.find({});
  const user = users[0];
  const userID = user.id;

  const newBlog = new Blog({
    ...req.body,
    likes: req.body.likes ? req.body.likes : 0,
    user: userID
  });

  try {    
    if (req.body.title && req.body.url) {
      const savedBlog = await newBlog.save();
      user.blogs = user.blogs.concat(savedBlog);
      await user.save();
      res.status(200).json(savedBlog);
    } else {
      res.status(400).send("blog shoud have title and url");
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBlog);
  } catch (error) {
    next (error);
  }
});

blogRouter.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json(updatedBlog);
  } catch {
    res.status(500).send("not valid id");
  }
});

module.exports = blogRouter;
