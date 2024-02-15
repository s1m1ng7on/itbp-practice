class Stringer {
    #initialString;

    constructor(initialString, initialLength) {
        this.#initialString = initialString;
        this.initialLength = initialLength;
    }

    increase(length) {
        this.initialLength += length;
    }

    decrease(length) {
        let newInitialLength = this.initialLength - length;
        this.initialLength = newInitialLength >= 0 ? newInitialLength : 0;
    }

    toString() {
        if (this.#initialString.length > this.initialLength) {
            return `${this.#initialString.substring(0, this.initialLength)}...`;
        } else if (this.initialLength == 0) {
            return '...';
        } else {
            return this.#initialString;
        }
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4); 
console.log(test.toString()); // Test