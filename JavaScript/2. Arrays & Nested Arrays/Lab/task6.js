function calculateBiggerHalf(numbers) {
    return numbers.Sort().Slice(numbers.length / 2 - 1)
}

console.log(calculateBiggerHalf([4, 7, 2, 5]));
console.log(calculateBiggerHalf([3, 19, 14, 7, 2, 19, 6]));