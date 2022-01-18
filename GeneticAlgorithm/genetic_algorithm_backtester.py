import ccxt

from GeneticAlgorithm.classes.population import Population
from Strategy.bollinger_bands_strategy import BollingerBandsStrategy
from Utils.utils import ccxt_ohlcv_to_dataframe
from Abstract.abstract_genetic_algorithm import AbstractGeneticAlgorithm


def build_strategy(individual):
    genes = individual.genes
    return BollingerBandsStrategy(
        bb_len=genes[0],
        n_std=genes[1] / 10,
        rsi_len=genes[2],
        rsi_overbought=genes[3],
        rsi_oversold=genes[4]
    )


def build_population():
    return Population(
        generation_size=50,
        n_genes=5,
        gene_ranges=[(20, 100), (10, 30), (8, 100), (50, 100), (0, 50)],
        n_best=5,
        mutation_rate=0.1
    )


class GeneticAlgorithmBacktester(AbstractGeneticAlgorithm):

    def __init__(self):
        exchange = ccxt.binance()
        self.symbol = 'SOL/USDT'
        timeframe = '1d'
        limit = 1000
        ohlcv = exchange.fetch_ohlcv(symbol, timeframe, limit)
        self.population = build_population()
        self.dataframe = ccxt_ohlcv_to_dataframe(ohlcv)
        self.number_of_generations = 20

    def print_header(self):
        print('<>--< GENETIC ALGORITHM >--<>')
        print()
        print('Use: optimize QUANT strategy')
        print('Indicators: Bollinger Bands - RSI')
        print('Symbol: ', self.symbol, 'Timeframe: ', self.timeframe)
        print('\n\n')

    def run(self):
        for x in range(selfnumber_of_generations):
            for individual in self.population.population:
                individual.backtester.reset_results()
                strategy = build_strategy(individual)
                strategy.set_up(self.dataframe)
                individual.backtester.__backtesting__(self.dataframe, strategy)
            self.population.crossover()
            self.population.mutation()
            self.sort_population()
            self.print_result(x)

    def sort_population(self):
        self.population.population = sorted(
            self.population.population,
            key=lambda indiv: indiv.backtester.return_results(
                symbol='-',
                start_date='-',
                end_date='-',
            )['fitness_function'],
            reverse=True
        )

    def print_result(self, generation_number):
        print()
        print('GENERATION: ', generation_number)
        print('_________________')
        print('\n\n')
        self.print_best_individual()
        self.print_worst_individual()

    def print_best_individual(self):
        print('BEST INDIVIDUAL:')
        print(self.population.population[0].backtester.return_results(
            symbol=self.symbol,
            start_date='',
            end_date=''
        ))
        print(self.population.population[0].genes)
        print('\n')

    def print_worst_individual(self):
        print('WORST INDIVIDUAL:')
        print(self.population.population[-1].backtester.return_results(
            symbol=self.symbol,
            start_date='',
            end_date=''
        ))
        print(self.population.population[-1].genes)
