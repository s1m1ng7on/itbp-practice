function getFibonator() {
    let fibonator = [];

    return function() {
        const newNumber = fibonator.length >= 2 ? fibonator[fibonator.length - 1] + fibonator[fibonator.length - 2] : 1;
        fibonator.push(newNumber);
        return newNumber;
    }
}

let fib = getFibonator();
console.log(fib()); //1
console.log(fib()); //1
console.log(fib()); //2
console.log(fib()); //3
console.log(fib()); //5
console.log(fib()); //8
console.log(fib()); //13