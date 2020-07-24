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