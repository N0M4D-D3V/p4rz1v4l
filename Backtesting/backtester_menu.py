from ccxt import BadSymbol
from pprint import pprint

from Backtesting.backtester import Backtester
from Backtesting.config import *
from DocumentWriter.document_writer import FileWriter
from Graphicator.classes.graph import Graph
from Strategy.factory.strategy_factory import StrategyFactory
from Config.dictionary.strategy_config_dictionary import backtest_menu_options
from Abstract.abstract_menu import AbstractMenu

from Utils.text import print_option_not_found

from Data.exchange_factory import ExchangeFactory
from Data.exchange_query import ExchangeQuery
from Data.exchange_service import ExchangeService


class BacktesterMenu(AbstractMenu):
    def __init__(self):
        self.is_menu_active: bool = is_menu_active_default
        self.initial_balance: float = initial_balance_default
        self.leverage: float = leverage_default
        self.trailing_stop_loss: bool = trailing_stop_loss_default
        self.query = ExchangeQuery()

    def init_default_values(self):
        self.query = ExchangeQuery()
        self.is_menu_active: bool = is_menu_active_default
        self.initial_balance: float = initial_balance_default
        self.leverage: float = leverage_default
        self.trailing_stop_loss: bool = trailing_stop_loss_default

    def start(self):
        while self.is_menu_active:
            try:
                self.print_menu()
                option = int(input(' -> Enter your choice: '))
                self.manage_options(option)

            except BadSymbol:
                print("\n The symbol does not exist: " + self.query.symbol)
            except KeyError:
                print("\n Probably u introduced an invalid timeframe. Try again >:b")

    def manage_options(self, option: int):
        if list(backtest_menu_options.keys())[-1] == option:
            self.exit_menu()
        elif list(backtest_menu_options.keys())[-1] > option >= list(backtest_menu_options.keys())[0]:
            menu_item = backtest_menu_options[option]
            self.run_test(menu_item.strategy_key, menu_item.is_configurable)
            self.exit_menu()
        else:
            print_option_not_found()

    def print_menu(self):
        print('\n<>----------< P4RZ1V4L >----------<>')
        print('      -----< Backtester >-----\n')
        for key in backtest_menu_options.keys():
            print(' <> ' + str(key) + ' >-< ' + backtest_menu_options[key].display_name)

    def exit_menu(self):
        self.is_menu_active = False

    def run_test(self, strategy_name, is_setting_params=False):
        # gets exchange, dataframe and strategy
        exchange = ExchangeFactory().get_instance()
        dataframe = ExchangeService(exchange).get_all(self.query)
        strategy = StrategyFactory(strategy_name)

        # ask 4 params if the user selected that option
        if is_setting_params:
            self.set_all_params()
            strategy.param_request()

        # Sets the strategy dataframe
        strategy.set_up(dataframe)

        # Executes the test
        backtester = self.get_backtester()
        solved_dataframe = backtester.backtesting(dataframe, strategy)

        # Get the results, print it in console and write it in file.
        # Then, creates and shows the graphic results.
        print('\n')
        results_dataset = backtester.return_results(symbol=self.query.symbol, start_date='', end_date='')
        pprint(results_dataset)
        FileWriter(results_dataset).save_results()
        Graph(solved_dataframe).show()

    def set_all_params(self):
        print('Setting tester params ...')
        self.query.symbol = str(input(' -> Symbol (SOL/USDT): ') or 'BTC/USDT')
        self.query.timeframe = str(input(' -> Timeframe (1d): ') or '1d')
        self.initial_balance = float(input(' -> Initial Balance (1000): ') or '1000')
        self.leverage = float(input(' -> Leverage (10): ') or '10')
        self.trailing_stop_loss = bool(input(' -> Stop-loss True/False (True): ') or 'True')

    def get_backtester(self):
        return Backtester(
            initial_balance=self.initial_balance,
            leverage=self.leverage,
            trailing_stop_loss=self.trailing_stop_loss
        )
