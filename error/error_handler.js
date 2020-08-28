const app = require('express')();


const sendErrorDev = (err, res) => {
    console.log(err);
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  };
  
  const sendErrorProd = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  };
  
const errorHandler = (err, req, res, next) =>
{
    console.log(err.statusCode);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
      } else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, res);
      }
      else
      {
    res.status(err.statusCode).send({message:err.message});
      }
  }

  module.exports = errorHandler;