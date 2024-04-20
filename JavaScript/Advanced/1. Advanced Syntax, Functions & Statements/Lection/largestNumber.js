function largestNumber(a, b, c) {
    let max;

    if (a > b) max = a;
    else max = b;

    if (max < c) max = c;

    return max;
}

console.log(largestNumber(130, 49, 48));