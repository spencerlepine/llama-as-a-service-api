const exitOnFail = (requestParams, response, context, ee, next) => {
  const statusCode = parseInt(response.statusCode);
  if (statusCode > 399) {
    next(new Error(`${requestParams.url} StatusCode: ${statusCode}`));
  } else {
    next();
  }
}

module.exports = {
  exitOnFail: exitOnFail
}