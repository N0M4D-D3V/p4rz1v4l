import { Individual } from "./individual.model";

export class Population {
  nGenes: number;
  geneRanges: [number, number][];
  nBest: number;
  generationSize: number;
  mutationRate: number;
  population: Individual[];

  constructor(
    generationSize: number,
    geneRanges: [number, number][],
    nBest: number,
    mutationRate: number
  ) {
    this.nGenes = geneRanges.length;
    this.geneRanges = geneRanges;
    this.nBest = nBest;
    this.generationSize = generationSize;
    this.mutationRate = mutationRate;
    this.population = [];

    for (let i = 0; i < generationSize; i++) {
      const individual = new Individual(this.nGenes, geneRanges);
      this.population.push(individual);
    }
  }

  selection(): Individual[] {
    return this.population
      .sort((a, b) => {
        const aFitness = a.backtester.getResults("-", new Date(), new Date())[
          "fitness_function"
        ];
        const bFitness = b.backtester.getResults("-", new Date(), new Date())[
          "fitness_function"
        ];
        return bFitness - aFitness;
      })
      .slice(0, this.nBest);
  }

  crossover(): void {
    const selected: Individual[] = this.selection();

    for (let i = 0; i < this.generationSize; i++) {
      const father: Individual[] = [
        selected[Math.floor(Math.random() * this.nBest)],
        selected[Math.floor(Math.random() * this.nBest)],
      ];

      const point: number = Math.floor(Math.random() * this.nGenes);

      this.population[i].genes.splice(
        0,
        point,
        ...father[0].genes.slice(0, point)
      );
      this.population[i].genes.splice(
        point,
        this.nGenes,
        ...father[1].genes.slice(point)
      );
    }
  }

  mutation(): void {
    for (let i = 0; i < this.generationSize; i++) {
      for (let j = 0; j < this.nGenes; j++) {
        const point: number = Math.floor(Math.random() * this.nGenes);

        if (Math.random() <= this.mutationRate) {
          let newGen: number = Math.floor(
            Math.random() *
              (this.geneRanges[point][1] - this.geneRanges[point][0] + 1) +
              this.geneRanges[point][0]
          );

          while (newGen === this.population[i].genes[point]) {
            newGen = Math.floor(
              Math.random() *
                (this.geneRanges[point][1] - this.geneRanges[point][0] + 1) +
                this.geneRanges[point][0]
            );
          }

          this.population[i].genes[point] = newGen;
        }
      }
    }
  }
}
