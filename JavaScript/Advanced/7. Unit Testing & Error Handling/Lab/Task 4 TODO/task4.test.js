const sum = require('./task4');
const { expect } = require('chai');

describe('Sum of numbers', () => {
    it('should return the sum of the values of all elements inside the array', () => {
        const numbers = [1, 2, 3, 4, 5];

        const actualValue = sum(numbers);
        const expectedValue = 15;

        expect(actualValue).to.equal(expectedValue);
    });
});