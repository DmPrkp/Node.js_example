'use strict'
let https = require('https');
let cheerio = require('cheerio');
let fs = require('fs');

let url = "https://spb.saturn.net/catalog/Stroymateriali/Obschestroitelnie-materiali/Metalloprokat-stalnoy/?sort_type=asc&sort=price&order%5Bp%5D=-1&order%5B3442%5D=0&order%5B3719%5D=-1&order%5B3720%5D=-1&order%5B3444%5D=-1&order%5B3712%5D=-1&order%5B3715%5D=-1&order%5B3716%5D=-1&price_min=52&price_max=9840&params%5B3442%5D%5B0%5D=14052"
let currentContent = "";

https.get(url, (res)=>{
    res.on('data', (chunk)=>{
        currentContent += chunk;
    })
    res.on('end', ()=>{
        parseContent(currentContent)
    })
})


function parseContent (content) {
    const $ = cheerio.load(content);
    //took the name
    let dirname = $('a[class = g]').text();
    let re1 = /мТ/;
    dirname = dirname.split(re1)

    //took the price
    let cost = $('div[class = block-price-value]').text();    
    let re2 = /\s\s*/;
    cost = cost.split(re2);    
    let cost2 = [];    
    cost.forEach((el)=>{
        if (!isNaN(el) && el !== ""){
           cost2.push(el)
        }
    })

    //made an result array
    let resultArr = [];
    for (let i=0; i<dirname.length; i++) {
        resultArr.push([
            dirname[i],
            cost2[i]+"\n"
        ])
    }
    console.log(resultArr);   
    
    fs.writeFile("metalPipe.txt", resultArr, (err)=>{
        if (err) throw err;      
        console.log('parse done')
    })
}

