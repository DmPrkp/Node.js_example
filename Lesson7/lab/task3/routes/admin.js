let express = require('express');
let passport = require('passport');
let route = express.Router();
let authenticationMiddleware = require('../authentication/middleware.js');

/*Роут организующий отдачу странички аутентификации*/
route.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("aut done")
        res.render('admin_panel', {});
    } else {
        console.log("Log in please")
        res.render('auth', {});
    }
});

/*Роут организующий прием данных со странички аутентификации.*/
route.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info)=> {
        if(err) {return next(err);}
        if(!user) {
            return res.render("auth", {massage: true});
        }
        req.login(user, (err)=>{
            if(err) {
                return next(err);               
            }
            return res.redirect('/admin')
        });
    })(req, res, next);
});

/*Роут организующий прием запрос o logout current user из системы*/
route.post('/out', (req, res, next) => {
    req.logout();
    res.redirect('/admin');
});

/*Роут организующий отдачу секретной информации.*/
route.get('/secret', authenticationMiddleware(), (req, res, next) => {
    res.send('Great secret info');
});

module.exports = route;