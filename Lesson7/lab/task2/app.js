let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mustacheExpress = require('mustache-express');
let bodyParser = require('body-parser');
let session = require('express-session');
let app = express();
let adminRout= require('./routes/admin.js');

app.set('views', __dirname+"/views");
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat', //!!подпись сессионной cookie
    name: 'sid', //!!имя сессионной cookie
    cookie: { httpOnly: true, maxAge: 60000}, //!!настройка cookie, в частности время жизни 1 мин
    resave: true, //!!на всякий случай, используется для хранилищ без функции touch
    saveUninitialized: true //!!сохранение объекта сессии в память
}));
app.use(express.static('public'));
app.use('/admin', adminRout);
app.listen(8000);