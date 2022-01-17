import ccxt

from p4rz1v4l.GeneticAlgorithm.classes.population import Population
from p4rz1v4l.Strategy.bollinger_bands_strategy import BollingerBandsStrategy
from p4rz1v4l.Utils.utils import ccxt_ohlcv_to_dataframe



exchange = ccxt.binance()
symbol = 'SOL/USDT'
timeframe = '1d'
limit = 1000
ohlcv = exchange.fetch_ohlcv(symbol, timeframe, limit)
df = ccxt_ohlcv_to_dataframe(ohlcv)

P = Population(
    generation_size=50,
    n_genes=5,
    gene_ranges=[(20, 100), (10, 30), (8, 100), (50, 100), (0, 50)],
    n_best=5,
    mutation_rate=0.1
)
population = P.population

number_of_generations = 20

print('<>--< GENETIC ALGORITHM >--<>')
print()
print('Use: optimize QUANT strategy')
print('Indicators: Bollinger Bands - RSI')
print('Symbol: ', symbol, 'Timeframe: ', timeframe)
print('\n\n')

for x in range(number_of_generations):
    for individual in population:

        individual.backtester.reset_results()
        genes = individual.genes
        strategy = BollingerBandsStrategy(
            bb_len=genes[0],
            n_std=genes[1]/10,
            rsi_len=genes[2],
            rsi_overbought=genes[3],
            rsi_oversold=genes[4]
        )
        strategy.set_up(df)
        individual.backtester.__backtesting__(df, strategy)
    P.crossover()
    P.mutation()

    population = sorted(
        population,
        key=lambda indiv: indiv.backtester.return_results(
                        symbol='-',
                        start_date='-',
                        end_date='-',
        )['fitness_function'],
        reverse=True
    )

    print()
    print('GENERATION: ', x)
    print('_________________')
    print('\n\n')

    print('BEST INDIVIDUAL:')
    print(population[0].backtester.return_results(
        symbol=symbol,
        start_date='',
        end_date=''
    ))
    print(population[0].genes)
    print('\n')

    print('WORST INDIVIDUAL:')
    print(population[-1].backtester.return_results(
        symbol=symbol,
        start_date='',
        end_date=''
    ))
    print(population[-1].genes)
