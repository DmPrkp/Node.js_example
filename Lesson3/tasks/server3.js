// Task 3///////////////////////////////////////////////////////////

const http = require("http");
const fs = require("fs");
const type = {
	html: {"Content-Type" : "text/html"},
	js: {"Content-Type" : "text/javascript"},
    plain: {"Content-Type" : "text/plain"},
    json: {'Content-Type': 'application/json'},
}

const html = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
		<div><H1>Hello Node</H1></div>
		<div>
			<h2>Users</h2>
            <div id="itemFields">

            </div>
			<button id="button">Else</button>
		</div>
		<script src='script.js'></script>
	</body>
</html>
`

const jsfile = `

const itemFields = document.querySelector("#itemFields");
let button = document.querySelector("#button");

let xhr = new XMLHttpRequest();
xhr.open('GET', 'i', false)
xhr.send();
if (xhr.status !=200) {
    console.log( xhr.status + ': ' + xhr.statusText + "there is no file here!")
} else {
    let firstItems = xhr.responseText;
    let firstItemsStr = JSON.parse(firstItems);   
    console.log(firstItemsStr);
}

button.addEventListener("click", ()=>{		
		xhr.open('GET', 'iAdd', true)
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
    
            if (xhr.status != 200) {
                alert( xhr.status + ': ' + xhr.statusText );
            } else {
                let items = xhr.responseText;
                let item = JSON.parse(items);
                console.log(item);
                let itemUL = "<ul></ul>";               
            }
        }      
    })
`

http.createServer((req, res)=> {
    switch (req.url) {
        case '/':
            res.writeHead(200, type.html); 			
            res.end(html);
        break
        case '/script.js':
            res.writeHead(200, type.js);
            res.end(jsfile)
        break
        case '/i':
            fs.readFile('items.json', 'utf8', (err, data)=>{
                if (err) {
                    console.log("there is no file here!");
                    res.writeHead(404);
                    res.end();
                } else {
                    res.writeHead(200, type.json);                    
                    let items = JSON.parse(data);
                    let firstItems = [];
                    for (let i=0; i<4; i++) {
                        firstItems.push(items[i])
                    }                    
                    let firstItemsStr = JSON.stringify(firstItems);                    
                    res.end(firstItemsStr);
                }
            })
        break
        case '/iAdd':
            fs.readFile('items.json', 'utf8', (err, data)=>{
                if (err) {
                    console.log("there is no file here!");
                    res.writeHead(404);
                    res.end();
                } else {
                    res.writeHead(200, type.json);                    
                    let items = JSON.parse(data);
                    let firstItems = [];
                    for (let i=3; i<items.length; i++) {
                        firstItems.push(items[i])
                    }                    
                    let firstItemsStr = JSON.stringify(firstItems);                    
                    res.end(firstItemsStr);
                }
            })
        break
        default: 
			res.writeHead(404); 
			res.end(); 
		break
    }
}).listen(8080, ()=> console.log("The server is works!"))
