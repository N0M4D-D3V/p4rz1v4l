from ccxt import NetworkError
from GeneticAlgorithm.genetic_algorithm_menu import GeneticAlgorithmMenu
from Backtesting.backtester_menu import BacktesterMenu
from Config.dictionary.grial_config_dictionary import menu_options
from Utils.text import *

genetic_algorithm_submenu = GeneticAlgorithmMenu()
backtester_submenu = BacktesterMenu()


def print_menu():
    print_title()
    for key in menu_options.keys():
        print(' <> ' + str(key) + ' >-< ' + menu_options[key])


def manage_options(selected_option):
    if selected_option == 1:
        backtester_submenu.init_default_values()
        backtester_submenu.start()

    elif selected_option == 2:
        genetic_algorithm_submenu.init_default_values()
        genetic_algorithm_submenu.start()

    elif selected_option == 3:
        print_not_implemented()

    elif selected_option == 4:
        print_exit()
    else:
        print_option_not_found()


if __name__ == "__main__":
    while True:
        try:
            print_menu()
            print('\n')
            option = int(input(' -> Enter your choice: '))
            manage_options(option)

        except (SyntaxError, ValueError):
            print_option_not_found()
        except KeyboardInterrupt:
            print_exit()
        except NetworkError:
            print_connectivity_error()
