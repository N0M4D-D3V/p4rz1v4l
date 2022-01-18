from GeneticAlgorithm.genetic_algorithm_menu import GeneticAlgorithmMenu

app_version = 'v0.0.0'
menu_options = {
    1: 'Backtest',
    2: 'Genetic Algorithm',
    3: 'Run P4RZ1V4L! >:v',
    4: "Go Away ='(",
}
file_paths = {
    'genetic_algorithm': './GeneticAlgorithm',
    'backtesting': './Backtesting',
}

genetic_algorithm_submenu = GeneticAlgorithmMenu()


def open_script(path_name):
    path = file_paths[path_name]
    exec(open(path + '/genetic_algorithm_menu.py').read())


def print_menu():
    print('\n<>----------< P4RZ1V4L >----------<>')
    print('        -----< ' + app_version + ' >-----\n')
    for key in menu_options.keys():
        print(' <> ' + str(key) + ' >-< ' + menu_options[key])


def manage_options(selected_option):
    if selected_option == 1:
        print("\n   Backtest initialized!")
        open_script('backtesting')

    elif selected_option == 2:
        genetic_algorithm_submenu.start()

    elif selected_option == 3:
        print("\n   Bot-Runner initialized!")

    elif selected_option == 4:
        print("\n\n   U 4r3 n0t r1ch 3n0ugh! >:[")
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
