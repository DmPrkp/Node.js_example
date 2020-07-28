// Task 1///////////////////////////////////////////////////////////

const http = require('http');
const fs = require('fs');
const type = {
	html: {"Content-Type" : "text/html"},
	js: {"Content-Type" : "text/javascript"},
	plain: {"Content-Type" : "text/plain"}
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
			<h2>Content</h2>
			<p id="container">text</p>
			<button id="button">AJAX</button>
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
		xhr.open('GET', 'content.html', false)
		xhr.send();
		if (xhr.status!=200) {			
			console.log( xhr.status + ': ' + xhr.statusText + "there is no file here!")
		} else {
			let text = xhr.responseText;
			console.log("uploaded is done");
			paragraph.innerText = text;
		}
	})
`

const content = ` New text by Ajax!!`


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
		case '/content.html': 
			res.writeHead(200, type.plain);	
			res.end(content); 
		break
		default: 
			res.writeHead(404); 
			res.end(); 
		break
	}	
}).listen(8080, ()=> console.log("server works"))

