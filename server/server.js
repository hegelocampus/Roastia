const path = require('path');
const mongoose = require('mongoose');
const db = require('../config/keys').MONGO_URI;
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const passport = require('passport');
const expressGraphQL = require("express-graphql");
const app = express();

const cors = require("cors");

const schema = require('./schema/schema');
app.use(passport.initialize());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const root = {
  ip: function (args, request) {
    return request.ip;
  }
};

app.use(
  "/graphql",
  expressGraphQL(req => ({
    schema: schema,
    rootValue: root,
    context: {
      token: req.headers.authorization
    },
    graphiql: true
  }))
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  })
} else {
  app.use(express.static(path.join(__dirname, '../client/public')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'pubilc', 'index.html'));
  })
}

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  //// set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  ////render the error page
  //res.status(err.status || 500);
  //res.send({message: 'error'});
  if (res.headersSent) {
    return next(err);
  }
  const { status } = err;
  res.status(status).json(err);
});


module.exports = app;
