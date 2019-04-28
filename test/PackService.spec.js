const chai = require('chai');  
const expect = require('chai').expect;

const PackService = require('../lib/PackService'); 
const PackResult = require('../lib/PackResult');

var service;


describe('PackService', () => {
    let service;

    beforeEach(() => {
        service = new PackService();
    });

    it('should return object with name Vegemite Scroll for code VS5', () => {
        var vs5 = service.getBakeryMetadata('VS5');
        expect(vs5).to.be.an('object');
        expect(vs5).to.have.property('name', 'Vegemite Scroll');
    });

    it('should return pack options [5, 3] for code VS5', () => {
        var packs = service.getBakeryPackOptions('VS5');
        expect(packs).to.deep.equal([5,3]);
    });
    
    it('should return pack options [8, 5, 2] for code VS5', () => {
        var packs = service.getBakeryPackOptions('MB11');
        expect(packs).to.deep.equal([8, 5, 2]);
    });

    it('should return pack options [9, 5, 3] for code CF', () => {
        var packs = service.getBakeryPackOptions('CF');
        expect(packs).to.deep.equal([9,5,3]);
    });

    it('should produce PackQty=10, Packs=[5, 5] given pack options [5,3] and Qty 10', () => {
        var qty = 10, packs = [5,3], resultQty = 2, resultPacks = [5, 5];
        var result = service.calcuateMinPacks(packs, qty);
        expect(result.packQty).to.equal(2);
        expect(result.packs.sort()).to.deep.equal(resultPacks);
    });

    it('should produce PackQty=4, Packs=[2, 2, 2, 8] given pack options [8,5,2] and Qty 14', () => {
        var qty = 14, packs = [8,5,2], resultQty = 4, resultPacks = [2, 2, 2, 8];
        var result = service.calcuateMinPacks(packs, qty);
        expect(result.packQty).to.equal(resultQty);
        expect(result.packs.sort()).to.deep.equal(resultPacks);
    });
});