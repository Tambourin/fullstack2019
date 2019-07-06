const requestLogger = (req, res, next) => {
  console.log(req.method + "--" + req.path);
  next();
}

const errorHandler = (error, request, response, next) => {
  if(error.name === "ValidationError") {
    return response.status(400).send(error.message);
  }
  if(error.name === "CastError" && error.kind === "ObjectID") {
    console.log("Cast error, invalid Id");
    return response.status(400).send("Cast error, invalid Id");
  }

  next(error);
}

module.exports = {
  requestLogger,
  errorHandler
}