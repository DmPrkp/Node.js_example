let outputArray = process.argv
let numArray = outputArray.splice(2, outputArray.length);
let answer = 0;
numArray.forEach(n=>answer+= +n)
console.log(answer)

