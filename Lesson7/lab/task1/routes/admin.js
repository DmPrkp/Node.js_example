let express = require('express');
let crypto = require('crypto');
let route = express.Router();
let db = require('../model/users.js');
let authCookies = {};

/*Handler will start when user will be request /admin.*/
route.use((req, res, next)=> {
    if(req.originalUrl === '/admin'){
        next()
    } else {
        let sid = req.cookies.sid
        if (sid && authCookies[sid]) {
            next();
        } else {
            res.redirect('/admin');
        }        
    }
})

/*Роут организующий отдачу странички аутентификации*/
route.get('/', (req, res, next)=>{
    let sid = req.cookies.sid;
    if (sid&&authCookies[sid]){
        res.render('admin_panel', {});
    } else {
        res.render('auth', {});
    }
});

/*Роут организующий прием данных со странички аутентификации.*/
route.post('/', (req, res, next)=>{
    if(!req.body.login) {
        res.render('auth', {message:true});
        return;
    }
    db.findUser(req.body.login, (err, user)=>{
        if(!user) return res.render('auth', {message: true});
        let passwordFromClient = crypto
            .createHash('sha512')
            .update('salt'+ req.body.pass)
            .digest('hex');
        if (user.password !== passwordFromClient)
            return res.render('auth', {message: true});
        let token = crypto
            .createHash('md5')
            .update(user.login)
            .update(user.password)
            .digest('hex');
        authCookies[token]=true;
        res.cookie('sid', token, {path: '/admin', httpOnly: true});
        res.redirect('/admin');
    });
})

/*Роут организующий прием запрос o logout current user из системы*/
route.post('/out', (req, res, next) => {
    let sid = req.cookies.sid;
    res.clearCookie('sid', {path: '/admin', httpOnly: true});
    delete authCookies[sid];
    res.redirect('/admin');
});

/*Роут организующий отдачу секретной информации.*/
route.get('/secret', (req, res, next)=> {
    res.send('Greate secret info');
});

module.exports = route;