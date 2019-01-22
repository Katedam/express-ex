const handler = (err, req, res, next) => {
  // Set code and message
  let code = 500;
  let message = 'Internal Server Error';
  // If err is an instance of HttpError
  // Set code and message to err - code and message
  if(err instanceof HttpError) {
    code = err.code;
    message = err.message;
    // else if the err returns either of these names
    // set to 400 and return the message from this error
  } else if(err.name === 'CastError' || err.name === 'ValidationError') {
    res
      .status(400)
      .send({ error: err.message });
    // else if the proces... is NOT production just send the error message provided
  } else if(process.env.NODE_ENV !== 'production') {
    res.send({ error: err.message });
  }
  res
    .status(code)
    .send({ error: message });
};

class HttpError extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = {
  handler,
  HttpError
};