menu_options = {
        1: 'Backtest',
        2: 'Genetic Algorithm',
        3: 'Create new trade-bot',
        4: 'Run trade-bot! >:v',
        5: "Go Away ='(",
        }

def print_menu():
    for key in menu_options.keys():
        print(' <> ' + str(key) + ' >-< ' + menu_options[key])

print('\n<>----------< P4RZ1V4L >----------<>\n')
print('Console enviroment running...')

while(True):
    print_menu()
    print('\n')
    
    try:
        option = int(input(' -> Enter your choice: '))
    except SyntaxError:
        print('bad input')
        option = 0
    except ValueError:
        print('bad input')
        option = 0

    if option == 1:
        print("\nBacktest initialized!")
    
    elif option == 2:
        print("\nGenetic Algorithm initialized!")

    elif option == 3:
        print("\nBot-Creator initialized!")

    elif option == 4:
        print("\nBot-Runner initialized!")

    elif option == 5:
        print("\n\nU 4r3 n0t r1ch 3n0ugh! >:[")
        exit()
    else:
        print("\n404 - Option not found!")

