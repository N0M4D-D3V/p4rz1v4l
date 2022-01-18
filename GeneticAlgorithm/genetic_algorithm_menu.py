class GeneticAlgorithmMenu:

    def __init__(self):
        self.isMenuActive: bool = True
        self.file_paths = {
            'genetic_algorithm': './GeneticAlgorithm',
            'backtesting': './Backtesting',
        }
        self.menu_options = {
            1: 'Pre-configured Run',
            2: 'Set configuration and Run',
            3: "Return",
        }

    def start(self):
        while self.isMenuActive:
            try:
                self.print_menu()
                print('\n')
                option = int(input(' -> Enter your choice: '))
                if option == 1:
                    pass

                elif option == 2:
                    pass

                elif option == 3:
                    self.isMenuActive = False

                else:
                    print("\n   404 - Option not found!")

            except SyntaxError:
                print("\n   404 - Option not found!")
            except ValueError:
                print("\n   404 - Option not found!")

    def print_menu(self):
        print('\n<>----------< P4RZ1V4L >----------<>')
        print('     -----< Genetic Algorithms >-----\n')
        for key in self.menu_options.keys():
            print(' <> ' + str(key) + ' >-< ' + self.menu_options[key])

    def open_script(self, path_name):
        path = self.file_paths[path_name]
        exec(open(path + '/genetic_algorithm_menu.py').read())
