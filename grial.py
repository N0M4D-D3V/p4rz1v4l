from GeneticAlgorithm.genetic_algorithm_menu import GeneticAlgorithmMenu
from Backtesting.backtester_menu import BacktesterMenu

app_version = 'v0.0.1'
menu_options = {
    1: 'Backtest',
    2: 'Genetic Algorithm',
    3: 'Run P4RZ1V4L! >:v',
    4: "Go Away ='(",
}

genetic_algorithm_submenu = GeneticAlgorithmMenu()
backtester_submenu = BacktesterMenu()


def print_menu():
    print('\n<>----------< P4RZ1V4L >----------<>')
    print('        -----< ' + app_version + ' >-----\n')
    for key in menu_options.keys():
        print(' <> ' + str(key) + ' >-< ' + menu_options[key])


def manage_options(selected_option):
    if selected_option == 1:
        print("\n   Backtest initialized!")
        backtester_submenu.start()

    elif selected_option == 2:
        genetic_algorithm_submenu.start()

    elif selected_option == 3:
        print("\n   Not implemented yet!")

    elif selected_option == 4:
        print("\n\n   Wake the f*ick Up!")
        print("We have a city to burn...")
        exit()
    else:
        print("\n   404 - Option not found!")


while True:
    try:
        print_menu()
        print('\n')
        option = int(input(' -> Enter your choice: '))
        manage_options(option)

    except SyntaxError:
        print("\n   404 - Option not found!")
    except ValueError:
        print("\n   404 - Option not found!")
    except KeyboardInterrupt:
        print("\n\n   Wake the f*ick Up!")
        print("We have a city to burn...")
        exit()
