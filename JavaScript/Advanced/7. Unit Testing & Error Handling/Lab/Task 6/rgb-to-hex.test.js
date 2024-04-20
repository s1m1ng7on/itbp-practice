const rgbToHexColor = require('./rgb-to-hex');
const { expect } = require('chai');

describe('RGB To Hex Test', () => {
    it('should return undefined for less or more than 3 arguments', () => {
        expect(rgbToHexColor(255, 0, 255, 0)).to.be.undefined;
    });
    it('should return undefined for an argument outside the range [0...250]', () => {
        expect(rgbToHexColor(256, 40, 180)).to.be.undefined;
    });
    it('should return undefined for invalid argument type', () => {
        expect(rgbToHexColor('75', 25, 80)).to.be.undefined;
    });
    it('should return the correct hex code for valid arguments', () => {
        expect(rgbToHexColor(255, 150, 255)).to.equal('#009600');
    });
});