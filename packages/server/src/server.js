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
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
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

const context = process.env.NODE_ENV === 'production' ? 'build' : 'public';
const clientDir = path.join(__dirname, '..', '..', 'client', context);

app.use(express.static(clientDir));
app.get('/', (req, res) => res.sendFile(path.join(clientDir, 'index.html')));

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  const { status } = err;
  res.status(status).json(err);
});


module.exports = app;
