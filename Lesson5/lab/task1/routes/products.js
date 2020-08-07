let express = require('express');
let router = express.Router();

router.get('/products/:id/:action', (req, res, next) => {
    console.log(`Параметры url: id ${req.params.id}` +
        ` action ${req.params.action}`);
    res.send('Ok!');
});

router.get('/products/:id', (req, res, next) => {
    console.log(`Параметры url: id ${req.params.id}`);
    res.send('Ok!');
});

router.get('/products', (req, res, next) => {
    console.log(`Параметры /products}`);
    res.send('Ok!');
});

router.get('/', (req, res, next) => {
    console.log(`Параметры url: /`);
    res.send('Ok!');
});

module.exports = router;

