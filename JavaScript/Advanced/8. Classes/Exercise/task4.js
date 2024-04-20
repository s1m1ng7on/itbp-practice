class List {
    constructor() {
        this.list = [];
    }

    add(element) {
        this.list.push(element);
        this.list.sort((a, b) => a - b);
    }

    remove(index) {
        this.list.splice(index, 1);
    }

    get(index) {
        return this.list[index];
    }

    get size() {
        return this.list.length;
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));
console.log(list.size);