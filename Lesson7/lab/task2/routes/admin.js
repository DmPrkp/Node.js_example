let express = require('express');
let crypto = require('crypto');
let route = express.Router();
let db = require('../model/users.js');

/*Handler will start when user will be request /admin.*/
route.use((req, res, next) => {
    if (req.originalUrl === '/admin' || req.session.isAuthenticated) {
        next()
    } else {
        console.log("Unexpected user")
        res.redirect('/admin');
    }
})

/*Роут организующий отдачу странички аутентификации*/
route.get('/', (req, res, next) => {
    if (req.session.isAuthenticated) {
        res.render('admin_panel', {});
    } else {
        res.render('auth', {});
    }
});

/*Роут организующий прием данных со странички аутентификации.*/
route.post('/', (req, res, next) => {
    if (!req.body.login) {
        res.render('auth', { message: true });
        return;
    }
    db.findUser(req.body.login, (err, user) => {
        if (!user) return res.render('auth', { message: true });
        let passwordFromClient = crypto
            .createHash('sha512')
            .update('salt' + req.body.pass)
            .digest('hex');
        if (user.password !== passwordFromClient)
            return res.render('auth', { message: true });
        req.session.isAuthenticated = true;
        res.redirect('/admin');
    });
});

/*Роут организующий прием запрос o logout current user из системы*/
route.post('/out', (req, res, next) => {
    req.session.destory();
    res.redirect('/admin');
});

/*Роут организующий отдачу секретной информации.*/
route.get('/secret', (req, res, next) => {
    res.send('Great secret info');
});

module.exports = route;