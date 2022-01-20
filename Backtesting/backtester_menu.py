import ccxt

from ccxt import BadSymbol
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
        self.symbol: str = 'SOL/USDT'
        self.timeframe: str = '1d'
        self.limit: int = 1000
        self.is_menu_active: bool = True
        self.initial_balance: float = 1000
        self.leverage: float = 10
        self.trailing_stop_loss: bool = True
        self.bb_len = 20
        self.bb_standard_derivations = 2.0
        self.rsi_len = 14
        self.rsi_overbought = 60
        self.rsi_oversold = 40

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
            except BadSymbol:
                print("\n Binance does not have market symbol " + self.symbol)

    def manage_options(self, option):
        if option == 1:
            self.run_test()
            self.exit_menu()
        elif option == 2:
            self.set_all_params()
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
        exchange = ccxt.binance()
        ohlcv = exchange.fetch_ohlcv(self.symbol, self.timeframe, self.limit)
        dataframe = ccxt_ohlcv_to_dataframe(ohlcv)
        strategy = self.get_strategy()
        strategy.set_up(dataframe)
        backtester = self.get_backtester()
        backtester.__backtesting__(dataframe, strategy)
        print(backtester.return_results(symbol=self.symbol, start_date='', end_date=''))
        print('\n')

    def set_all_strategy_params(self):
        print('Setting all params ...')
        self.set_tester_params()
        self.set_bb_params()
        self.set_rsi_params()

    def set_tester_params(self):
        print('Setting tester params ...')
        self.symbol = str(input(' -> Symbol (SOL/USDT): ') or 'BTC/USDT')
        self.timeframe = str(input(' -> Timeframe (1d): ') or '1d')
        self.initial_balance = float(input(' -> Initial Balance (1000): ') or '1000')
        self.leverage = float(input(' -> Leverage (10): ') or '10')
        self.trailing_stop_loss = bool(input(' -> Stoploss True/False (True): ') or 'True')

    def set_bb_params(self):
        print('BB Options: ')
        self.bb_len = float(input(' -> BB Length (20): ') or '20')
        self.bb_standard_derivations = float(input(' -> BB Standard Derivations (2.0): ') or '2.0')

    def set_rsi_params(self):
        print('RSI Options: ')
        self.rsi_len = float(input(' -> RSI Length (14): ') or '14')
        self.rsi_overbought = float(input(' -> RSI Overbought (60): ') or '60')
        self.rsi_oversold = float(input(' -> RSI Oversold (40): ') or '40')

    def get_strategy(self):
        return BollingerBandsStrategy(
            bb_len=self.bb_len,
            n_std=self.bb_standard_derivations,
            rsi_len=self.rsi_len,
            rsi_overbought=self.rsi_overbought,
            rsi_oversold=self.rsi_oversold
        )

    def get_backtester(self):
        return Backtester(
            initial_balance=self.initial_balance,
            leverage=self.leverage,
            trailing_stop_loss=self.trailing_stop_loss
        )
