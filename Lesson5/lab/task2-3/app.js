let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let router = express.Router();

let user;

let route = router.get('/login', (req,res, next)=>{
    res.send(`${user.login}`)
    console.log('router works')
})

app.use('/', route);


app.listen(3000);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('public'));

app.post('/login', (req,res,next)=>{    
    user = req.body;
    console.log(user.login);
    res.send(`Hello ${user.login}`);
})