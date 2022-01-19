import ccxt

from Abstract.abstract_menu import AbstractMenu
from Backtesting.backtester import Backtester
from Strategy.bollinger_bands_strategy import BollingerBandsStrategy
from Utils.utils import ccxt_ohlcv_to_dataframe

menu_options = {
    1: 'Bollinger Bands + RSI Strategy',
    2: 'Run BB + RSI Strategy with custom parameters',
    3: "Return",
}


class BacktesterMenu(AbstractMenu):
    def __init__(self):
        exchange = ccxt.binance()
        self.symbol: str = 'SOL/USDT'
        timeframe: str = '1d'
        limit: int = 1000
        ohlcv = exchange.fetch_ohlcv(self.symbol, timeframe, limit)
        self.dataframe = ccxt_ohlcv_to_dataframe(ohlcv)
        self.is_menu_active: bool = True

        self.initial_balance: float = 1000
        self.leverage: float = 10
        self.trailing_stop_loss: bool = True

    def start(self):
        while self.is_menu_active:
            try:
                self.print_menu()
                option = int(input(' -> Enter your choice: '))
                self.manage_options(option)

            except SyntaxError:
                print("\n   404 - Option not found!")
            except ValueError:
                print("\n   404 - Option not found!")

    def manage_options(self, option):
        if option == 1:
            self.run_test()
            self.exit_menu()
        elif option == 2:
            self.set_initial_balance()
            self.set_leverage()
            self.set_stop_loss()
            self.run_test()
            self.exit_menu()
        elif option == 3:
            self.exit_menu()
        else:
            print("\n   404 - Option not found!")

    def print_menu(self):
        print('\n<>----------< P4RZ1V4L >----------<>')
        print('      -----< Backtester >-----\n')
        for key in menu_options.keys():
            print(' <> ' + str(key) + ' >-< ' + menu_options[key])

    def exit_menu(self):
        self.is_menu_active = False

    def run_test(self):
        strategy = BollingerBandsStrategy()
        strategy.set_up(self.dataframe)
        backtester = Backtester(
            initial_balance=self.initial_balance,
            leverage=self.leverage,
            trailing_stop_loss=self.trailing_stop_loss
        )
        backtester.__backtesting__(self.dataframe, strategy)
        print(backtester.return_results(symbol=self.symbol, start_date='', end_date=''))
        print('\n')

    def set_initial_balance(self):
        self.initial_balance = float(input(' -> Initial Balance: '))

    def set_leverage(self):
        self.leverage = float(input(' -> Leverage: '))

    def set_stop_loss(self):
        self.trailing_stop_loss = bool(input(' -> Stoploss True/False: '))
