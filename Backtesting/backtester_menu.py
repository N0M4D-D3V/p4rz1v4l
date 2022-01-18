from Abstract.abstract_menu import AbstractMenu
from Backtesting.backtester import Backtester

class BacktesterMenu(AbstractMenu):
    def __init__(self):
        self.is_menu_active: bool = True
        self.backtester = Backtester(
            initial_balance=1000,
            leverage=10,
            trailing_stop_loss=True
        )
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
            #TESTEAR
            pass

        elif option == 2:
            self.is_menu_active = False

        else:
            print("\n   404 - Option not found!")

    def print_menu(self):
        print('\n<>----------< P4RZ1V4L >----------<>')
        print('      -----< Backtester >-----\n')
        for key in self.menu_options.keys():
            print(' <> ' + str(key) + ' >-< ' + self.menu_options[key])