import { Backtester } from "@models/backtest/backtester.model";

export class Individual {
  genes: number[];
  backtester: Backtester;

  constructor(nGenes: number, geneRanges: [number, number][]) {
    this.genes = [];
    for (let i = 0; i < nGenes; i++) {
      const geneRange: [number, number] = geneRanges[i];
      const gene: number =
        Math.floor(Math.random() * (geneRange[1] - geneRange[0] + 1)) +
        geneRange[0];
      this.genes.push(gene);
    }

    this.backtester = new Backtester({
      initialBalance: 1000,
      leverage: 10,
      trailingStoploss: true,
      feeCostPercentage: 0.01,
    });
  }
}
