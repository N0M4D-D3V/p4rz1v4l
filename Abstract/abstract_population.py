import abc


class AbstractPopulation(metaclass=abc.ABCMeta):

    # Selection of population for make new crossovers and mutations.
    @abc.abstractmethod
    def selection(self):
        raise NotImplementedError

    # Mix the population to obtain new individuals.
    @abc.abstractmethod
    def crossover(self):
        raise NotImplementedError

    # Mutates the population, searching the best genes.
    @abc.abstractmethod
    def mutation(self):
        raise NotImplementedError
