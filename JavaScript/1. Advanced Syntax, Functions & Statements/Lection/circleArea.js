function calculateCircleArea(radius) {
    const pi = 3.14;

    if (typeof(radius) == 'number') {
        let area =  pi * (radius ** 2);
        console.log(area);
    }
    else {
        console.log('We can not calculate the circle area, because we receive ${typeof(radius)}.');
    }
}

calculateCircleArea('name');
