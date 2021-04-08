import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should - Once the sell by date has passed, Quality degrades twice as fast', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 4) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
        expect(items[0].sellIn).to.be.lessThan(0);
    });

    it('should quality never be negative', function() {
        const gildedRose = new GildedRose([ new Item('foo', 8, 1) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.be.greaterThan(-1);
    });

    it('should "Aged Brie" actually increases in Quality the older it gets', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 8, 3) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(5);
    });

    it('should Quality of an item is never more than 50', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 8, 50) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
    });

    it('should "Sulfuras", being a legendary item, never has to be sold or decreases in Quality - quality be 80', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras', 8, 50) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
    });

    it('should "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches; ' +
        'quality increases by 2 when there are 10 days or less', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes', 8, 7) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(9);
    });

    it('should "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches; ' +
        'by 3 when there are 5 days or less', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes', 5, 7) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(10);
    });

    it('should "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches; ' +
        'quality drops to 0 after the concert, concert is on day 0', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes', 0, 7) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    it('should "Conjured" items degrade in Quality twice as fast as normal items (-2)', function() {
        const gildedRose = new GildedRose([ new Item('Conjured', 5, 7) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(5);
    });
});
