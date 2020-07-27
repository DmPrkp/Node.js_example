// Task 1///////////////////////////////////////////////////////////

function* makeGenerator() {
	const simbols = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
	
	while (true) {
	let i = Math.floor(Math.random() * simbols.length)
	yield simbols[i];
	};	
}
const simbolGen = makeGenerator()

console.log(simbolGen.next().value)
console.log(simbolGen.next().value)


function iteraGenerator(ownLength) {
	let newPassword = ''
	while (newPassword.length < ownLength) {
		let l = simbolGen.next().value;
		newPassword += l
	}
	return newPassword
}

let newPassword = iteraGenerator(16)

console.log(newPassword)

// Task 2///////////////////////////////////////////////////////////

let data2 = "data.txt";
const fs = require('fs');

fs.readFile(data2, 'utf8', (err, data) => {
	if (err) {
		console.log('Could not find or open file for reading\n');
		response.statusCode = 404;
		response.end();
	} else {
		let dataToArray = data.split(" ");
		
		let stringMultOf2 = dataToArray.map((num)=>{
			 if (num%2 === 0) {
				return num
			};
		}).join(" ");
		console.log(`${stringMultOf2} -numbers multiple of 2`);
		
		let stringOfCub = dataToArray.map((num)=>{return Math.pow(num, 3)}).join(" ");
		console.log(`${stringOfCub} -numbers of 3`);

		fs.writeFile("out-1.txt", stringMultOf2, (err) => {
			if (err) throw err;
			console.log(`out-1.txt has been saved!`);
		  });

		fs.writeFile("out-2.txt", stringOfCub, (err) => {
			if (err) throw err;
			console.log(`out-2.txt has been saved!`);
		  });
	}
});