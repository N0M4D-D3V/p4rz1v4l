import abc


class AbstractGeneticAlgorithm(metaclass=abc.ABCMeta):

    # Executes the genetic algorithm sentences.
    @abc.abstractmethod
    def run(self):
        raise NotImplementedError

    # Prints the genetic algorithm results related to a
    # generation number in console.
    @abc.abstractmethod
    def print_result(self, generation_number: int):
        raise NotImplementedError
