// Task 1///////////////////////////////////////////////////////////
function customSetTimeout(func, sec) {
	let currentDate = new Date().getTime() + (sec * 1000)
	return function f() {
		if (currentDate <= new Date().getTime()) {
			return func
		} else {

		}
	};
}

function func1() {
	console.log('Функция выполниться с задержкой в 2 секунд!');
};

let paused = customSetTimeout(func1, 2);

//paused();

// Task 2///////////////////////////////////////////////////////////

function func1() {
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

let func_decoreted = return_object(func1, 'one', 'two');
let r = func_decoreted();

console.log(r.one);
console.log(r.two);

function func2() {
	return ['JS', 'is', 'programming language']
}

let d = return_object(func2, 'a', 'b', 'c')();
console.log(d.c)

