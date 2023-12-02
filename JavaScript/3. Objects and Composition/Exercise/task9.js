function createSortedList() {
    return {
        list: [],
        add: function (element) {
            const index = this.list.findIndex(currentElement => element < currentElement);
            if (index === -1) {
                this.list.push(element);
            } else {
                this.list.splice(index, 0, element);
            }
        },
        remove: function (index) {
            this.list.splice(index, 1);
        },
        get: function (index) {
            return this.list[index];
        },
        size: function () {
            return this.list.length;
        }
    };
}

let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));