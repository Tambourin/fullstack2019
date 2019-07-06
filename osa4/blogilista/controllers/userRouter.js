const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response, next) => {
  const body = request.body;
  
  if(!body.password) {
    return response.status(400).send("password required");
  } else if(body.password.length < 4) {
    return response.status(400).send("password too short");
  }

  const user = new User({
    ...body, 
    passwordHash: await bcrypt.hash(body.password, 10),
  });
  
  try {
    const savedUser = await user.save();
    response.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
  
});

userRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({}).populate("blogs");
    response.json(users);
  } catch(exception) {
    console.log("could not fetch user data");
  }
  
});

module.exports = userRouter;