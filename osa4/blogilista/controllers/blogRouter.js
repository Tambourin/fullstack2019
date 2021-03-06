const blogRouter = require("express").Router();
const jsonWebToken = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");



blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    if (blogs) {
      return res.json(blogs).status(200);
    } else {
      res.status(404);
    }
  } catch (exception) {
    console.log(exception);
  }
});

blogRouter.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user");
    res.json(blog).status(200);
  } catch (exception) {
    console.log("Tietyn blogin haku ideellä ei onnistunut");
  }
});

blogRouter.post("/", async (req, res, next) => {
  const token = req.token;
  if(!token) {
    console.log("No token provided");
    return res.status(401).send({ error: "Token missing" });
  }

  try {
    const decodedToken = jsonWebToken.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);

    const newBlog = new Blog({
      ...req.body,
      likes: req.body.likes ? req.body.likes : 0,
      comments: [],
      user: user.id
    });

    if (req.body.title && req.body.url) {
      const savedBlog = await newBlog.save();
      user.blogs = user.blogs.concat(savedBlog);
      await user.save();
      res.status(200).json(savedBlog);
    } else {
      res.status(400).send("blog shoud have title and url");
    }
  } catch (exception) {
    next(exception);
  }  
});

blogRouter.delete("/:id", async (req, res, next) => {
  const blogToBeDeleted = await Blog.findById(req.params.id);
  //console.log("Blog to be deleted:", blogToBeDeleted.user);
  try {
    const decodedToken = jsonWebToken.verify(req.token, process.env.SECRET);

    if (blogToBeDeleted.user.toString() !== decodedToken.id) {
      console.log("Unauthorized attemp to delete item");
      return res.status(401).send({ error: "Unauthorized attemp to delete item"});
    }
    
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);    
    res.status(200).json(deletedBlog);
  } catch(error) {
    next(error);
  }
});

blogRouter.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).populate("user");
    res.status(200).json(updatedBlog);
  } catch {
    res.status(500).send("not valid id");
  }
});

//blogRouter.get("/:id/comments", async (req, res) => {
//  const response = await Blog.find({}) 
//});

blogRouter.post("/:id/comments", async (req, res) => {
  try{
    const blog = await Blog.findById(req.params.id);
    const blogWithNewComment = {
      ...blog._doc,
      comments: [
       ...blog._doc.comments,
        req.body.comment
      ]
    };
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blogWithNewComment, { new: true });
    res.status(200).json(updatedBlog);
  } catch {
    res.status(500).send("error: There was an error while adding a comment.")
  } 
});

module.exports = blogRouter;