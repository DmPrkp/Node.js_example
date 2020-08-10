let express = require('express');
let passport = require('passport');
let route = express.Router();
let authenticationMiddleware = require('../authentication/middleware.js');

/*Роут организующий отдачу странички аутентификации*/
route.get('/', (req, res, next) => {
    /* Проверяем авторизован пользователь или нет, функция isAuthenticated появляется благодаря модулю passport */
    if (req.isAuthenticated()) {
        /*Разрешение есть. Функция рендер наполняет шаблон (файл admin_panel.mustache) данными указанными вторым аргументом*/
        res.render('admin_panel', {});
    } else {
        /*функция рендер наполняет шаблон (файл auth.mustache) данными указанными вторым аргументом*/
        res.render('auth', {});
    }
});

/*Роут организующий прием данных со странички аутентификации.*/
route.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); } //если ошибка вызываем обработчик ошибок
        /* если пользователь не найдено, отдаем страницу аутентификации с сообщением об ошибке */
        if (!user) { return res.render('auth', { message: true }); }
        //даём сигнал модулю passport, что пользователь авторизовался
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.redirect('/admin'); //перенаправляем на /admin
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