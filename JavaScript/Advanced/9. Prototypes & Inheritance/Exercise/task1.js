(function arrayExtension() {
    Array.prototype.last = function() {
        return this[this.length - 1];
    }
    
    Array.prototype.skip = function(elementsToSkip) {
        return this.slice(elementsToSkip);
    }
    
    Array.prototype.take = function(elementsToTake) {
        return this.slice(0, elementsToTake);
    }
    
    Array.prototype.sum = function() {
        return this.reduce((initialSum, currentElement) => initialSum += currentElement, 0);
    }
    
    Array.prototype.average = function() {
        return this.sum() / this.length;
    }
})();

let myArr = [1, 2, 3];
console.log(myArr.last());
console.log(myArr.skip(1));
console.log(myArr.take(2));
console.log(myArr.sum());