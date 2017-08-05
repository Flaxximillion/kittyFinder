const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');

const index = require('./routes/index');
const survey = require('./routes/survey');
//const result = require('./routes/result');

const app = express();

const Sequelize = new sequelize('\n' +
    'postgres://bdzotqeidhrgoa:d180e8abaf344ab6887c329a60fe8098ac6b1e32838e20782bd89b5d25192c0a@ec2-184-72-230-93.compute-1.amazonaws.com:5432/derd227lc2pjuc&sslmode=require',{
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    },
    define:{
        timestamps: false
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/survey', survey);
//app.use('/result', result);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
