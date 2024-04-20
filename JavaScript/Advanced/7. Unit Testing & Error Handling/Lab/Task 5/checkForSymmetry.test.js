const { expect } = require('chai');
const isSymmetric = require('./checkForSymmetry');

describe('Check For Symmetry Test', () => {
    it('should take an array as argument -> false', () => {
        expect(isSymmetric('')).to.equal(false);
    });
    it('should calculate if an array is symmetrical -> true', () => {
        expect(isSymmetric([1, 1, 1])).to.equal(true);
    });
    it('should calculate if an array is symmetrical -> false', () => {
        expect(isSymmetric([1, 2, 3, 4])).to.equal(false);
    });
});