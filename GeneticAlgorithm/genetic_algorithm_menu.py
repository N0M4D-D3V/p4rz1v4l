from Abstract.abstract_menu import AbstractMenu
from GeneticAlgorithm.genetic_algorithm_backtester import GeneticAlgorithmBacktester
from Config.strategy_config_dictionary import backtest_menu_options


class GeneticAlgorithmMenu(AbstractMenu):

    def __init__(self):
        self.is_menu_active: bool = True

    def reset_default_values(self):
        self.is_menu_active: bool = True

    def start(self):
        while self.is_menu_active:
            try:
                self.print_menu()
                option = int(input(' -> Enter your choice: '))
                self.manage_options(option)

            except (SyntaxError, ValueError):
                print("\n   404 - Option not found!")

    def manage_options(self, option):
        if list(backtest_menu_options.keys())[-1] == option:
            self.exit_menu()
        elif list(backtest_menu_options.keys())[-1] > option >= list(backtest_menu_options.keys())[0]:
            menu_item = backtest_menu_options[option]
            self.run_test(menu_item.strategy_key, menu_item.is_configurable)
            self.exit_menu()
        else:
            print("\n   404 - Option not found!")

    def run_test(self, strategy_key: str, is_configurable: bool = False):
        tester = GeneticAlgorithmBacktester(strategy_key)

        if is_configurable:
            tester.param_request()

        tester.run()

    def print_menu(self):
        print('\n<>----------< P4RZ1V4L >----------<>')
        print('  -----< Genetic Algorithms >-----\n')
        for key in backtest_menu_options.keys():
            print(' <> ' + str(key) + ' >-< ' + backtest_menu_options[key].display_name)

    def exit_menu(self):
        self.is_menu_active = False
