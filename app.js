var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session')


//loading routers
var routes = require('./routes/index');
var users = require('./routes/users');

//loading db
var db = require('./db')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret:"apptoken", maxAge :6000}))

//urls
app.use('/', routes);
app.use('/user', users);

app.get('/createSession/:userName', function (req, res) {
    console.log("req.params---->>>",req.params)
    if (req.session.userName === 'haranath') {
        res.send('Session already exist');
    } else {
        req.session.userName = req.params.userName;
        res.send('Session create successfully');
    }
});
//If you want to delete the total session use the following way
//req.session = null; or delete req.session
app.get('/clearSession', function (req, res) {
    req.session = null;
    res.send('Cleared the session');
});
//retreving the all sessions
app.get('/getSession', function (req, res) {
    res.send(req.session);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
