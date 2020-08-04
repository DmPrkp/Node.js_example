'use strict'
const async = require("async");
const http = require('http');
let urls = process.argv.slice(2)

async.map(urls, (url, next) => {
    http.get(url,res => {
        let str = '';
        res.setEncoding('utf8')
        res.on('data', (chunk) => {str += chunk})
        res.on('end', ()=> next(null, str))
    });    
}, (err, res) => {
    res.forEach(item => console.log(item))
}
)

