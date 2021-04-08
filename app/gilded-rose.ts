export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items: Item[] = []) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let currentItem: Item = this.items[i];
            currentItem.sellIn--;
            if ((currentItem.name === 'Aged Brie'
                || currentItem.name === 'Backstage passes') && currentItem.quality < 50) {
                let numOfDaysToSellIn = currentItem.sellIn;
                if (numOfDaysToSellIn <= 0) {
                    currentItem.quality = 0;
                } else if (numOfDaysToSellIn <= 5) {
                    currentItem.quality += 3;
                } else if (numOfDaysToSellIn <= 10) {
                    currentItem.quality += 2;
                }
            } else if (currentItem.name === 'Conjured') {
                currentItem.quality -= 2;
            } else if (currentItem.name === 'Sulfuras' && currentItem.quality !== 80) {
                currentItem.quality = 80;
            } else if (currentItem.sellIn < 0) {
                if (currentItem.quality >= 2) {
                    currentItem.quality -= 2
                } else {
                    currentItem.quality = 0;
                }
            }
        }
        return this.items;
    }
}
