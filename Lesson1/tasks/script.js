// Task 1///////////////////////////////////////////////////////////
function customSetTimeout(func, sec) {	
	return function f(n) {
		let currentDate = new Date().getTime() + (sec * 1000)
		let New = new Date().getTime();
		while (currentDate > New) {
			New = new Date().getTime();
		}
		return func(n);
	};
}

function func1() {
	console.log('Функция выполниться с задержкой в 2 секунд!');
};

function func11(name) {
	console.log(name +'с задержкой в 2 секунды!');
};

let paused = customSetTimeout(func11, 2);

paused("petr");

// Task 2///////////////////////////////////////////////////////////

function func2() {
	return [1, 2]
}

function return_object(func, ...arg) {
	return function () {
		let arr = func();
		let argArr = [...arg];
		let resultObj = {};
		for (let i = 0; i < argArr.length; i++) {
			resultObj[argArr[i]] = arr[i]
		}
		return resultObj;
	}
}

let func_decoreted = return_object(func2, 'one', 'two');
let r = func_decoreted();

console.log(r.one);
console.log(r.two);

function func3() {
	return ['JS', 'is', 'programming language']
}

let d = return_object(func3, 'a', 'b', 'c')();
console.log(d.c)

