app_version = 'v0.0.0'
menu_options = {
    1: 'Backtest',
    2: 'Genetic Algorithm',
    3: 'Create new bot',
    4: 'Run P4RZ1V4L! >:v',
    5: "Go Away ='(",
}


def print_menu():
    print('\n<>----------< P4RZ1V4L >----------<>')
    print('        -----< ' + app_version + ' >-----\n')
    for key in menu_options.keys():
        print(' <> ' + str(key) + ' >-< ' + menu_options[key])


def manage_options(selected_option: int):
    if selected_option == 1:
        print("\n   Backtest initialized!")

    elif selected_option == 2:
        print("\n   Genetic Algorithm initialized!")

    elif selected_option == 3:
        print("\n   Bot-Creator initialized!")

    elif selected_option == 4:
        print("\n   Bot-Runner initialized!")

    elif selected_option == 5:
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
