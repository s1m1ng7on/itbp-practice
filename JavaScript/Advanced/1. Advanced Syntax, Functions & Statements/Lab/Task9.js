function printRectangle(size) {
    let row = '';
    for (let i = 0; i < size; i++) {
        row += '* ';
    }

    for (let j = 0; j < size; j++) {
        console.log(row);
    }
}

printRectangle(1);
printRectangle(2);
printRectangle(5);
printRectangle(7);