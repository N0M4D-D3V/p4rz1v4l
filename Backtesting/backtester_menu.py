import ccxt

from Abstract.abstract_menu import AbstractMenu
from Backtesting.backtester import Backtester
from Strategy.bollinger_bands_strategy import BollingerBandsStrategy
from Utils.utils import ccxt_ohlcv_to_dataframe


class BacktesterMenu(AbstractMenu):
    def __init__(self):
        exchange = ccxt.binance()
        self.symbol = 'SOL/USDT'
        timeframe = '1d'
        limit = 1000
        ohlcv = exchange.fetch_ohlcv(self.symbol, timeframe, limit)
        self.dataframe = ccxt_ohlcv_to_dataframe(ohlcv)
        self.is_menu_active: bool = True
        self.menu_options = {
            1: 'Bollinger Bands + RSI Strategy',
            2: "Return",
        }

    def start(self):
        while self.is_menu_active:
            try:
                self.print_menu()
                print('\n')
                option = int(input(' -> Enter your choice: '))
                self.manage_options(option)

            except SyntaxError:
                print("\n   404 - Option not found!")
            except ValueError:
                print("\n   404 - Option not found!")

    def manage_options(self, option):
        if option == 1:
            self.run_test()

        elif option == 2:
            self.is_menu_active = False

        else:
            print("\n   404 - Option not found!")

    def print_menu(self):
        print('\n<>----------< P4RZ1V4L >----------<>')
        print('      -----< Backtester >-----\n')
        for key in self.menu_options.keys():
            print(' <> ' + str(key) + ' >-< ' + self.menu_options[key])

    def run_test(self):
        strategy = BollingerBandsStrategy()
        strategy.set_up(self.dataframe)
        backtester = Backtester(
            initial_balance=1000,
            leverage=10,
            trailing_stop_loss=True
        )
        backtester.__backtesting__(self.dataframe, strategy)
        print(backtester.return_results(symbol=self.symbol, start_date='', end_date=''))
        print('\n')
