(function stringExtension() {
    String.prototype.ensureStart = function(string) {
        
    }

    String.prototype.ensureEnd = function() {

    };

    String.prototype.isEmpty = function() {
        return this.length === 0;
    };

    String.prototype.truncate = function() {

    };

    String.prototype.format = function(string, ...params) {
        console.log(...params.length);
    };
})();

let myString = 'my string';
myString = myString.ensureStart('my');
console.log(myString.format('nibba', 'alina', 'malina', 'talina'));