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
            switch (currentItem.name) {
                case 'Backstage passes':
                case 'Aged Brie':
                    this.handleBackstagePasses(currentItem);
                    break;
                case 'Conjured':
                    this.handleConjured(currentItem);
                    break;
                case 'Sulfuras':
                    this.handleSulfuras(currentItem);
                    break;
                default:
                    this.handleDefault(currentItem);
                    break;
            }
        }
        return this.items;
    }

    private handleDefault(currentItem: Item) {
        if (currentItem.sellIn < 0) {
            if (currentItem.quality >= 2) {
                currentItem.quality -= 2
            } else {
                currentItem.quality = 0;
            }
        } else {
            currentItem.quality--;
        }
    }

    private handleSulfuras(currentItem: Item) {
        if (currentItem.quality == 80) return;

        currentItem.quality = 80;
    }

    private handleConjured(currentItem: Item) {
        currentItem.quality -= 2;
    }

    private handleBackstagePasses(currentItem: Item) {
        if (currentItem.quality == 50) return;

        let numOfDaysToSellIn = currentItem.sellIn;
        if (numOfDaysToSellIn <= 0) {
            currentItem.quality = 0;
        } else if (numOfDaysToSellIn <= 5) {
            currentItem.quality += 3;
        } else if (numOfDaysToSellIn <= 10) {
            currentItem.quality += 2;
        }
    }

}
