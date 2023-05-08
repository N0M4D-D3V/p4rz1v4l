import { Population } from "./population.model";

export class PopulationFactory {
  private strategyKey: string;
  private generationSize: number;
  private mutationRate: number;

  constructor(
    strategyKey: string,
    generationSize: number,
    mutationRate: number
  ) {
    this.strategyKey = strategyKey;
    this.generationSize = generationSize;
    this.mutationRate = mutationRate;
  }

  getInstance(): Population {
    if (this.strategyKey === "BollingerBandsStrategy") {
      return this.getBBInstance();
    } else if (this.strategyKey === "RSIEMA") {
      return this.getRSIEMAInstance();
    } else {
      throw new Error(`Invalid strategy key: ${this.strategyKey}`);
    }
  }

  private getBBInstance(): Population {
      return new Population(
        this.generationSize,
        [
          [20, 100],
          [10, 30],
          [8, 100],
          [50, 100],
          [0, 50],
        ],
        5,
        this.mutationRate
      );
    }

    private getRSIEMAInstance(): Population {
      return new Population(
        this.generationSize,
        [
          [5, 15],
          [7, 30],
          [15, 45],
        ],
        5,
        this.mutationRate
      );
    }
}
