const blogRouter = require("express").Router();
const jsonWebToken = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (!authorization) {
    return null;
  }
  if(authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
}

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
  //console.log("Authorization: ", req.get("authorization"));
  const token = getTokenFrom(req);
  //console.log('Token: ', token);
  if(!token) {
    console.log("No token provided");
    return res.status(401).send({ error: "Token missing" });
  }

  try {
    const decodedToken = jsonWebToken.verify(token, process.env.SECRET);
    //console.log('decodedToken', decodedToken);

    const user = await User.findById(decodedToken.id);
    //console.log('found user:', user);

    const userID = user.id;

    const newBlog = new Blog({
      ...req.body,
      likes: req.body.likes ? req.body.likes : 0,
      user: userID
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
