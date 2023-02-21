var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
var user=require('./models/userSchema')
const mongoose=require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// ==============================
var cors = require('cors');
const router = require('./routes/index');
const { json } = require('express');
var corsOptions = {
  origin: 'http://localhost:3000/',
  Credential:true,
  optionsSuccessStatus: 200
}
// =================================
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ===============================
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function(req, file, cb){
    cb(null,Date.now()+'_'+ file.originalname)
  },
})
const upload = multer({ storage: storage })


app.post('/upload', upload.single('file'), function (req, res,next) {
  console.log(req.file);
  if(!req.file){
    res.send({code:200,message:'error'})
  }
  else{
    res.send({code:500,message:'upload successful'})
  }
})


app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

router.post('/up',async function(req,res,next){
  try {
    const data=await user.create(req.body);

    res.status(201).json({
      status:"success",
      data
    })
  } catch (error) {
    res.json({
      error
    })
  }
})

mongoose.set('strictQuery', false);
module.exports = app;
