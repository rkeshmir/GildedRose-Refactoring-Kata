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

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {

    this.items.forEach(item => {
      if (!item.name.startsWith('Sulfuras')) {
        item.sellIn--;
      }
      getUpdateMethod(item)(item);
    })

    return this.items;
  }
}

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

const basicUpdateMethod = (item: Item, acceleration = 1) => {
  item.quality = Math.max(MIN_QUALITY, item.quality - (item.sellIn < 0 ? 2 * acceleration :  acceleration));
}

const conjuredUpdateMethod = (item: Item) => {
  basicUpdateMethod(item, 2);
}

const improvingUpdateMethod = (item: Item) => {

  item.quality = Math.min(
    MAX_QUALITY,
    item.quality + (item.sellIn < 0 ? 2 : 1)
  );
}

const BACKSTAGE_PASS_DOUBLE_QUALITY_THRESHOLD = 10;
const BACKSTAGE_PASS_TRIPLE_QUALITY_THRESHOLD = 5;
const backStageUpdateMethod = (item: Item) => {

  if (item.sellIn < 0) {
    item.quality = MIN_QUALITY;
    return;
  }

  item.quality = Math.min(
    MAX_QUALITY,
    item.quality + (
      item.sellIn >= BACKSTAGE_PASS_DOUBLE_QUALITY_THRESHOLD ?
        1 : item.sellIn >= BACKSTAGE_PASS_TRIPLE_QUALITY_THRESHOLD ?
          2 : 3
    )
  );
}

const legendaryUpdateMethod = () => {};

type QualityUpdater = (item: Item) => void;

const getUpdateMethod: (item: Item) => QualityUpdater = (item: Item) => {
  if (item.name.startsWith('Sulfuras')) {
    return legendaryUpdateMethod;
  }
  if (item.name.startsWith('Conjured')) {
    return conjuredUpdateMethod;
  }
  if (item.name === 'Aged Brie') {
    return improvingUpdateMethod;
  }
  if (item.name.startsWith('Backstage passes')) {
    return backStageUpdateMethod;
  }
  return basicUpdateMethod
}
