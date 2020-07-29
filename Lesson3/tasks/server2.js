// Task 1///////////////////////////////////////////////////////////

const http = require('http');
const fs = require('fs');
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
			<p id="container">text</p>
			<button id="button">JSON</button>
		</div>
		<script src='script.js'></script>
	</body>
</html>
`
const jsfile = `
let paragraph = document.querySelector("#container");
let button = document.querySelector("#button");

button.addEventListener("click", ()=>{
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'users.json', false)
		xhr.send();
		if (xhr.status!=200) {
			console.log( xhr.status + ': ' + xhr.statusText + "there is no file here!")
		} else {
			let users = xhr.responseText;
			let user = JSON.parse(users);
			let userUL = "<ul><li>"+user.join('</li><li>')+"</li></ul>";        
        	paragraph.innerHTML = userUL;
		}         
    })
`

//let usersJSON = '["Vasili", "Petr", "Sergey"]'

http.createServer((req, res)=> {
	switch (req.url) {
		case '/': 
			res.writeHead(200, type.html); 			
			res.end(html);
		break
		case '/script.js': 
			res.writeHead(200, type.js);	
			res.end(jsfile); 
		break
		case '/users.json': 
			fs.readFile('users.json', 'utf8', (err, data)=>{
                if (err) {
					console.log("there is no file here!")
                    res.writeHead(404); 
			        res.end(); 
                } else {					
                    res.writeHead(200, type.json);
					res.end(data);					
                }
           })
		break
		default: 
			res.writeHead(404); 
			res.end(); 
		break
	}
}).listen(8080, ()=> console.log("The server is works!"))

