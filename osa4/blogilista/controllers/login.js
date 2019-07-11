const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });

  //console.log('User:', user);
  //console.log('body', body);
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if(!passwordCorrect) {
    return response.status(401).json({ error: "Authetication error" });
  }

  const token = jsonWebToken.sign({ username: user.username, id: user._id }, process.env.SECRET);
  console.log(passwordCorrect);
  response.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
