from Abstract.abstract_menu import AbstractMenu
from GeneticAlgorithm.genetic_algorithm_backtester import GeneticAlgorithmBacktester


class GeneticAlgorithmMenu(AbstractMenu):

    def __init__(self):
        self.is_menu_active: bool = True
        self.genetic_algorithm_tester = GeneticAlgorithmBacktester()
        self.menu_options = {
            1: 'Pre-configured Run',
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
            self.genetic_algorithm_tester.run()
            self.exit_menu()

        elif option == 2:
            self.exit_menu()

        else:
            print("\n   404 - Option not found!")

    def print_menu(self):
        print('\n<>----------< P4RZ1V4L >----------<>')
        print('  -----< Genetic Algorithms >-----\n')
        for key in self.menu_options.keys():
            print(' <> ' + str(key) + ' >-< ' + self.menu_options[key])

    def exit_menu(self):
        self.is_menu_active = False