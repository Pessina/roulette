import { Item } from "@/api/types";

import { weightedRandom } from "./weightedRandom";

describe("weightedRandom", () => {
  it("should return an index based on weighted probability", () => {
    const items: Item[] = [
      { id: "1", item: "item1", probability: 1 },
      { id: "2", item: "item2", probability: 2 },
      { id: "3", item: "item3", probability: 3 },
    ];

    let results = new Array(items.length).fill(0);

    for (let i = 0; i < 10000; i++) {
      const index = weightedRandom(items);
      results[index]++;
    }

    expect(results[0]).toBeGreaterThan(1000);
    expect(results[0]).toBeLessThan(2000);
    expect(results[1]).toBeGreaterThan(2000);
    expect(results[1]).toBeLessThan(4000);
    expect(results[2]).toBeGreaterThan(4000);
    expect(results[2]).toBeLessThan(6000);
  });

  it("should return indices equally when probabilities are the same", () => {
    const items: Item[] = [
      { id: "1", item: "item1", probability: 1 },
      { id: "2", item: "item2", probability: 1 },
      { id: "3", item: "item3", probability: 1 },
    ];

    let results = new Array(items.length).fill(0);
    for (let i = 0; i < 9000; i++) {
      const index = weightedRandom(items);
      results[index]++;
    }

    expect(results[0]).toBeGreaterThan(2500);
    expect(results[0]).toBeLessThan(3500);
    expect(results[1]).toBeGreaterThan(2500);
    expect(results[1]).toBeLessThan(3500);
    expect(results[2]).toBeGreaterThan(2500);
    expect(results[2]).toBeLessThan(3500);
  });

  it("should return higher probability item most of the time", () => {
    const items: Item[] = [
      { id: "1", item: "item1", probability: 1 },
      { id: "2", item: "item2", probability: 1 },
      { id: "3", item: "item3", probability: 10 },
    ];

    let results = new Array(items.length).fill(0);
    for (let i = 0; i < 12000; i++) {
      const index = weightedRandom(items);
      results[index]++;
    }

    expect(results[0]).toBeLessThan(1500);
    expect(results[1]).toBeLessThan(1500);
    expect(results[2]).toBeGreaterThan(9000);
  });

  it("should return undefined when items array is empty", () => {
    const items: Item[] = [];

    const index = weightedRandom(items);

    expect(index).toEqual(0);
  });
});
