let express = require('express');
let route = express.Router();
module.exports = route;

let db = require('../model/model_widgets.js');

route.get('/', (req, res, next) => {
    db.findAll((err, data) => {
        if (err) return res.send('Error all widget!');
        res.render("all", {
            title: "All Widgets",
            route_url: "/widgets",
            arrData: data
        })
    })
})

route.get('/add', (req, res, next) => {
    res.render('add', {
        title: "New Widget",
        route_url: "/widgets"
    });
});

route.post('/add', (req, res, next) => {
    db.add(req.body, (err, data) => {
        if (err) return res.send('Error add widget!(Post)');
        res.redirect("/widgets/")
    });
});

route.get('/delete/:id', (req, res, next) => {
    /*Просим хранилище виджетов вернуть объект, описывающий виджет с конретным id который прислан в последней части пути */
    db.find(parseInt(req.params.id), (err, data) => {
        if (err || !data)
            return res.send('Error delete widget (get)!');
        /* функция рендер наполняет шаблон (файл delete.mustache) данными указанными вторым аргументом */
        res.render('delete', {
            title: "Delete widget", //Используемый на странице заглавная надпись
            route_url: "/widgets", //Основная часть пути URL используется в href
            data: data //Непосредственно данные об потенциально удаляемом виджете
        });
    });
});

route.post('/delete/:id', (req, res, next) => {
    db.delete(parseInt(req.params.id), (err, data) => {
        if (err || !data)
            return res.send('Cant delete widget(post)')
        res.redirect('/widgets/')
    })
})

route.get('/edit/:id', (req, res, next) => {
    db.find(parseInt(req.params.id), (err, data) => {
        if (err || !data)
            return res.send('Error edit widget (get)!');
        res.render('edit', {
            title: "Edit Widget",
            route_url: "/widgets",
            data: data
        });
    });
});

route.post('/edit/:id', (req, res, next) => {
    db.edit(req.body, (err, data) => {
        if (err || !data)
            return res.send('Cant edit widget(post)')
        res.redirect('/widgets/')
    })
})

