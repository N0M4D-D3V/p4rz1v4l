export abstract class AbstractPopulation {
  // Selection of population for make new crossovers and mutations.
  public abstract selection(): void;

  // Mix the population to obtain new individuals.
  public abstract crossover(): void;

  // Mutates the population, searching the best genes.
  public abstract mutation(): void;
}
