import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('normal items', () => {
    it('decreases sellIn and quality by 1', () => {
      const gildedRose = new GildedRose([
        new Item('Normal item', 10, 20),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(19);
    });

    it('decreases quality twice as fast after the sell-by date', () => {
      const gildedRose = new GildedRose([
        new Item('Normal item', 0, 20),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(18);
    });

    it('never decreases quality below 0', () => {
      const gildedRose = new GildedRose([
        new Item('Normal item', 5, 0),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.quality).toBe(0);
    });
  });

  describe('Aged Brie', () => {
    it('increases quality by 1', () => {
      const gildedRose = new GildedRose([
        new Item('Aged Brie', 10, 20),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(21);
    });

    it('increases quality twice as fast after the sell-by date', () => {
      const gildedRose = new GildedRose([
        new Item('Aged Brie', 0, 20),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(22);
    });

    it('never increases quality above 50', () => {
      const gildedRose = new GildedRose([
        new Item('Aged Brie', 5, 50),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.quality).toBe(50);
    });
  });

  describe('Sulfuras', () => {
    it('never changes sellIn or quality', () => {
      const gildedRose = new GildedRose([
        new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(80);
    });
  });

  describe('Backstage passes', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';

    it.each([
      [11, 20, 21],
      [10, 20, 22],
      [6, 20, 22],
      [5, 20, 23],
      [1, 20, 23],
    ])(
      'with sellIn %i changes quality from %i to %i',
      (sellIn, quality, expectedQuality) => {
        const gildedRose = new GildedRose([
          new Item(name, sellIn, quality),
        ]);

        const [item] = gildedRose.updateQuality();

        expect(item.sellIn).toBe(sellIn - 1);
        expect(item.quality).toBe(expectedQuality);
      },
    );

    it('drops quality to 0 after the concert', () => {
      const gildedRose = new GildedRose([
        new Item(name, 0, 20),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(0);
    });

    it('never increases quality above 50', () => {
      const gildedRose = new GildedRose([
        new Item(name, 5, 49),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.quality).toBe(50);
    });
  });

  describe('Conjured items', () => {
    it('decreases quality twice as fast as a normal item', () => {
      const gildedRose = new GildedRose([
        new Item('Conjured Mana Cake', 10, 20),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(18);
    });

    it('decreases quality twice as fast again after the sell-by date', () => {
      const gildedRose = new GildedRose([
        new Item('Conjured Mana Cake', 0, 20),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(16);
    });

    it('never decreases quality below 0', () => {
      const gildedRose = new GildedRose([
        new Item('Conjured Mana Cake', 5, 1),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.quality).toBe(0);
    });
  });
});
