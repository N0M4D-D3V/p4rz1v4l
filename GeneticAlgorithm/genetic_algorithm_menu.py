from Abstract.abstract_menu import AbstractMenu
from GeneticAlgorithm.genetic_algorithm_backtester import GeneticAlgorithmBacktester

menu_options = {
    1: 'Pre-configured Run',
    2: 'Configure algorithm',
    3: "Return",
}


class GeneticAlgorithmMenu(AbstractMenu):

    def __init__(self):
        self.is_menu_active: bool = True
        self.number_of_generations = 20
        self.generation_size = 50
        self.n_genes = 5
        self.mutation_rate = 0.1

    def start(self):
        while self.is_menu_active:
            try:
                self.print_menu()
                option = int(input(' -> Enter your choice: '))
                self.manage_options(option)

            except SyntaxError:
                print("\n   404 - Option not found!")
            except ValueError:
                print("\n   404 - Option not found!")

    def manage_options(self, option):
        if option == 1:
            self.run_test()
            self.exit_menu()
        elif option == 2:
            self.set_number_of_generations()
            self.set_generation_size()
            self.set_n_genes()
            self.set_mutation_rate()
            self.run_test()
            self.exit_menu()
        elif option == 3:
            self.exit_menu()

        else:
            print("\n   404 - Option not found!")

    def run_test(self):
        genetic_algorithm_tester = GeneticAlgorithmBacktester(self.number_of_generations, self.generation_size,
                                                              self.n_genes, self.mutation_rate)
        genetic_algorithm_tester.run()

    def print_menu(self):
        print('\n<>----------< P4RZ1V4L >----------<>')
        print('  -----< Genetic Algorithms >-----\n')
        for key in menu_options.keys():
            print(' <> ' + str(key) + ' >-< ' + menu_options[key])

    def set_number_of_generations(self):
        self.number_of_generations = int(input(' -> Number of generations (20): '))

    def set_generation_size(self):
        self.generation_size = int(input(' -> Generation size (50): '))

    def set_n_genes(self):
        self.number_of_generations = int(input(' -> Set number of genes (5): '))

    def set_mutation_rate(self):
        self.number_of_generations = float(input(' -> Set mutation rate (0.1): '))

    def exit_menu(self):
        self.is_menu_active = False
