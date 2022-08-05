from Abstract.abstract_factory import AbstractFactory
from GeneticAlgorithm.classes.individual import Individual
from Strategy.bollinger_bands_strategy import BollingerBandsStrategy
from Strategy.rsi_ema_strategy import RsiEmaStrategy


class GeneticStrategyFactory(AbstractFactory):

    def __init__(self, strategy_key: str, individual: Individual):
        super().__init__(strategy_key)
        self.individual = individual

    # Creates Bollinger Bands strategy
    def _get_bb_instance(self):
        genes = self.individual.genes
        return BollingerBandsStrategy(
            bb_len=genes[0],
            n_std=genes[1] / 10,
            rsi_len=genes[2],
            rsi_overbought=genes[3],
            rsi_oversold=genes[4]
        )

    # Creates RSI/EMA strategy
    def _get_rsi_ema_instance(self):
        genes = self.individual.genes
        return RsiEmaStrategy(
            ma_fast_len=genes[0],
            rsi_len=genes[1],
            rsi_oversold=genes[2]
        )