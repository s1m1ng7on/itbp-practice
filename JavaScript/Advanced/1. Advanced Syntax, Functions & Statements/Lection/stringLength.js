function stringLength(a, b, c) {
    let stringLength = a.length + b.length + c.length;
    let averageStringLength = stringLength / 3;

    console.log(stringLength);
    console.log(Math.round(averageStringLength));
}

stringLength('chocolate', 'ice cream', 'pizza');