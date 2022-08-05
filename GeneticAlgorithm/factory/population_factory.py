from Abstract.abstract_factory import AbstractFactory
from GeneticAlgorithm.classes.population import Population


class PopulationFactory(AbstractFactory):
    def __init__(self, strategy_key: str, generation_size: int, mutation_rate: float):
        super().__init__(strategy_key)
        self.generation_size = generation_size
        self.mutation_rate = mutation_rate

    # Gets a Population instance for BollingerBandsStrategy.
    # Params in gene_ranges ordered: bb_len, n_std, rsi_len, rsi_overbought, rsi_oversold
    def _get_bb_instance(self):
        return Population(
            generation_size=self.generation_size,
            gene_ranges=[(20, 100), (10, 30), (8, 100), (50, 100), (0, 50)],
            n_best=5,
            mutation_rate=self.mutation_rate
        )

    # Gets a population instance for RSI/EMA strategy.
    # Params in gene_ranges ordered: ema_fast, rsi_len, rsi_oversold
    def _get_rsi_ema_instance(self):
        return Population(
            generation_size=self.generation_size,
            gene_ranges=[(5, 15), (7, 30), (15, 45)],
            n_best=5,
            mutation_rate=self.mutation_rate
        )
