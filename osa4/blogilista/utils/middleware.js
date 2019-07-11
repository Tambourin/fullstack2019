const requestLogger = (req, res, next) => {
  console.log(req.method + "--" + req.path);
  next();
}

const errorHandler = (error, request, response, next) => {
  if(error.name === "ValidationError") {
    console.log(error);
    return response.status(400).send(error.message);
  } else if(error.name === "CastError" && error.kind === "ObjectID") {
    console.log("Cast error, invalid Id");
    return response.status(400).send("Cast error, invalid Id");
  } else if(error.name === "JsonWebTokenError") {
    console.log("There was an error with authentication token");
    return response.status(401).send({ error: "There was an error with authentication token" });    
  }  

  next(error);
}

module.exports = {
  requestLogger,
  errorHandler
}