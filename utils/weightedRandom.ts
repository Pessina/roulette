import { Item } from "@/api/types";

function weightedRandom(items: Item[]): number {
  let totalWeight = items.reduce((prev, curr) => prev + curr.probability, 0);

  let randomNum = Math.random() * totalWeight;

  let weightSum = 0;

  for (let i = 0; i < items.length; i++) {
    weightSum += items[i].probability;

    if (randomNum <= weightSum) {
      return i;
    }
  }

  return 0;
}

export { weightedRandom };
