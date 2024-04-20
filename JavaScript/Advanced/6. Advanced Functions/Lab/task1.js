function area() {
    return Math.abs(this.x * this.y);
}

function vol() {
    return Math.abs(this.x * this.y * this.z);
};

function solve(area, vol, input) {
    const inputArray = JSON.parse(input);
    const result = [];
    
    inputArray.forEach(inputElement => {
        result.push({
            area: area.call(inputElement),
            volume: vol.call(inputElement)
        })
    });

    console.log(result);
};

solve(area, vol, `[
    {"x":"1","y":"2","z":"10"},
    {"x":"7","y":"7","z":"10"},
    {"x":"5","y":"2","z":"10"}
    ]`
);