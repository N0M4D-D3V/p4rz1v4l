import ccxt

from ccxt import BadSymbol
from Abstract.abstract_menu import AbstractMenu
from Backtesting.backtester import Backtester
from Utils.utils import ccxt_ohlcv_to_dataframe
from Strategy.factory.strategy_factory import StrategyFactory
from Config.dictionary.strategy_config_dictionary import backtest_menu_options


class BacktesterMenu(AbstractMenu):
    def __init__(self):
        self.symbol: str = 'SOL/USDT'
        self.timeframe: str = '1d'
        self.limit: int = 1000
        self.is_menu_active: bool = True
        self.initial_balance: float = 1000
        self.leverage: float = 10
        self.trailing_stop_loss: bool = True

    def reset_default_values(self):
        self.symbol: str = 'SOL/USDT'
        self.timeframe: str = '1d'
        self.limit: int = 1000
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

            except (SyntaxError, ValueError):
                print("\n   404 - Option not found!")
            except BadSymbol:
                print("\n Binance does not have market symbol " + self.symbol)
            except KeyError:
                print("\n Probably u introduced an invalid timeframe. Try again >:b")

    def manage_options(self, option):
        if list(backtest_menu_options.keys())[-1] == option:
            self.exit_menu()
        elif list(backtest_menu_options.keys())[-1] > option >= list(backtest_menu_options.keys())[0]:
            menu_item = backtest_menu_options[option]
            self.run_test(menu_item.strategy_key, menu_item.is_configurable)
            self.exit_menu()
        else:
            print("\n   404 - Option not found!")


    def print_menu(self):
        print('\n<>----------< P4RZ1V4L >----------<>')
        print('      -----< Backtester >-----\n')
        for key in backtest_menu_options.keys():
            print(' <> ' + str(key) + ' >-< ' + backtest_menu_options[key].display_name)

    def exit_menu(self):
        self.is_menu_active = False

    def run_test(self, strategy_name, is_setting_params=False):
        exchange = ccxt.binance()
        ohlcv = exchange.fetch_ohlcv(self.symbol, self.timeframe, self.limit)
        dataframe = ccxt_ohlcv_to_dataframe(ohlcv)
        strategy = StrategyFactory(strategy_name)

        if is_setting_params:
            strategy.param_request()

        strategy.set_up(dataframe)
        backtester = self.get_backtester()
        backtester.__backtesting__(dataframe, strategy)
        print('\n')
        print(backtester.return_results(symbol=self.symbol, start_date='', end_date=''))

    def set_all_params(self):
        print('Setting tester params ...')
        self.symbol = str(input(' -> Symbol (SOL/USDT): ') or 'BTC/USDT')
        self.timeframe = str(input(' -> Timeframe (1d): ') or '1d')
        self.initial_balance = float(input(' -> Initial Balance (1000): ') or '1000')
        self.leverage = float(input(' -> Leverage (10): ') or '10')
        self.trailing_stop_loss = bool(input(' -> Stoploss True/False (True): ') or 'True')

    def get_backtester(self):
        return Backtester(
            initial_balance=self.initial_balance,
            leverage=self.leverage,
            trailing_stop_loss=self.trailing_stop_loss
        )
