var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cors = require('cors');

const session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

var indexRouter = require('./routes/index');
var articleRouter = require('./routes/articles');
// var behindcutRouter = require('./routes/behindcuts');
var boardRouter = require('./routes/boards');
var cartRouter = require('./routes/carts');
// var collectionRouter = require('./routes/collections');
var customerRouter = require('./routes/customers');
var donatorRouter = require('./routes/donators');
var interestitemRouter = require('./routes/interestitems');
var orderRouter = require('./routes/orders');
var orderedproductRouter = require('./routes/orderedproducts');
var productRouter = require('./routes/products');
var settingRouter = require('./routes/setting');

var memberRouter = require('./routes/members');

var mainpageimageRouter = require('./routes/mainpageimages');
var mainpagevideoRouter = require('./routes/mainpagevideos');

var behindimageRouter = require('./routes/behindimages');
var behindvideoRouter = require('./routes/behindvideos');
var lookbookimageRouter = require('./routes/lookbookimages');
var lookbookvideoRouter = require('./routes/lookbookvideos');

var sequelize = require('./models').sequelize;
const passportConfig = require('./passport');

var app = express();
app.use(cors());
sequelize.sync();
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('setting/mainpage/img', express.static(path.join(__dirname, 'public/assets/image/mainpage'))); // /img/abc.png
// app.use('setting/members/img', express.static(path.join(__dirname, 'public/assets/image'))); // /img/abc.png


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/customer', customerRouter);

app.use('/article', articleRouter);
// app.use('/behindcut', behindcutRouter);
app.use('/board', boardRouter);
app.use('/cart', cartRouter);
// app.use('/collection', collectionRouter);
app.use('/donator', donatorRouter);
app.use('/interestitem', interestitemRouter);
app.use('/order', orderRouter);
app.use('/orderedproduct', orderedproductRouter);
app.use('/product', productRouter);
app.use('/setting', settingRouter);
app.use('/member', memberRouter);

app.use('/mainpageimage', mainpageimageRouter);
app.use('/mainpagevideo', mainpagevideoRouter);

app.use('/behindimage', behindimageRouter);
app.use('/behindvideo', behindvideoRouter);
app.use('/lookbookimage', lookbookimageRouter);
app.use('/lookbookvideo', lookbookvideoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
