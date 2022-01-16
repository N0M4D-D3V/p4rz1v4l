import abc


class AbstractPopulation(metaclass=abc.ABCMeta):

    @abc.abstractmethod
    def selection(self):
        raise NotImplementedError

    @abc.abstractmethod
    def crossover(self):
        raise NotImplementedError

    @abc.abstractmethod
    def mutation(self):
        raise NotImplementedError
