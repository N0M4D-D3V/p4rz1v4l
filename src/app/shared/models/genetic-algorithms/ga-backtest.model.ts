import { Strategy } from "@models/strategy/estrategy.model";
import { Individual } from "./individual.model";
import { Population } from "./population.model";
import { PopulationFactory } from "./population-factory.model";
import { Backtester } from "@models/backtest/backtester.model";

function buildStrategy(strategyKey: string, individual: Individual): Strategy {
  //   const strategyFactory: GeneticStrategyFactory = new GeneticStrategyFactory(
  //     strategyKey,
  //     individual
  //   );
  //   return strategyFactory.getInstance();
  return;
}

export class GeneticAlgorithmBacktester {
  strategyKey: string;
  //query: ExchangeQuery;
  dataframe: any;
  number_of_generations: number;
  generation_size: number;
  n_genes: number;
  mutation_rate: number;
  population: Population;
  symbol: string;

  constructor(
    symbol: string,
    strategyKey: string,
    number_of_generations: number = 20,
    generation_size: number = 50,
    mutation_rate: number = 0.1
  ) {
    this.strategyKey = strategyKey;
    // const exchange = ExchangeFactory.getInstance();
    // this.query = new ExchangeQuery();
    // this.dataframe = ExchangeService(exchange).getAll(this.query);
    this.number_of_generations = number_of_generations;
    this.generation_size = generation_size;
    this.n_genes = 5;
    this.mutation_rate = mutation_rate;
    this.population = this.buildPopulation();
    this.symbol = symbol;
  }

  paramRequest(): void {
    this.number_of_generations = parseInt(
      prompt(" -> Number of generations (20): ") || "20"
    );
    this.generation_size = parseInt(
      prompt(" -> Generation size (50): ") || "50"
    );
    this.mutation_rate = parseFloat(
      prompt(" -> Set mutation rate (0.1): ") || "0.1"
    );
  }

  run(): void {
    for (let x = 0; x < this.number_of_generations; x++) {
      for (const individual of this.population.population) {
        individual.backtester = new Backtester({
          initialBalance: 1000,
          leverage: 10,
          trailingStoploss: true,
          feeCostPercentage: 0.01,
        });
        const strategy = buildStrategy(this.strategyKey, individual);
        individual.backtester.execute(this.dataframe, strategy);
      }
      this.population.crossover();
      this.population.mutation();
      this.sortPopulation();
      this.printResult(x);
    }
  }

  sortPopulation(): void {
    this.population.population.sort((indiv1, indiv2) => {
      const results1 = indiv1.backtester.getResults(
        this.symbol,
        new Date(),
        new Date()
      );
      const results2 = indiv2.backtester.getResults(
        this.symbol,
        new Date(),
        new Date()
      );
      return results2.fitness_function - results1.fitness_function;
    });
  }

  printResult(generationNumber: number): void {
    console.log();
    console.log("GENERATION: ", generationNumber);
    console.log("_________________");
    console.log("\n\n");
    this.printBestIndividual();
    this.printWorstIndividual();
  }

  printBestIndividual(): void {
    console.log("BEST INDIVIDUAL:");
    console.log(
      this.population.population[0].backtester.getResults(
        this.symbol,
        new Date(),
        new Date()
      )
    );
    console.log(this.population.population[0].genes);
    console.log("\n");
  }

  buildPopulation(): Population {
    const populationFactory = new PopulationFactory(
      this.strategyKey,
      this.generation_size,
      this.mutation_rate
    );
    return populationFactory.getInstance();
  }

  printWorstIndividual(): void {
    console.log("WORST INDIVIDUAL:");
    console.log(
      this.population.population[
        this.population.population.length - 1
      ].backtester.getResults(this.symbol, new Date(), new Date())
    );
    console.log(
      this.population.population[this.population.population.length - 1].genes
    );
  }
}
