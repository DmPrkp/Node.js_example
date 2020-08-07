let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mustacheExpress = require('mustache-express');
let user;
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.set('views', __dirname+'/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.post('/login', (req, res, next)=>{
    user = req.body
    console.log(user)
    res.render('index', {title: `Hello ${user.login}! You are secesfully registered on our website!`});
    
})

app.listen(3000);