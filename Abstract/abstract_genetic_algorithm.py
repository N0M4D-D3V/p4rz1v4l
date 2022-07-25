import abc


class AbstractGeneticAlgorithm(metaclass=abc.ABCMeta):

    @abc.abstractmethod
    def run(self):
        raise NotImplementedError

    @abc.abstractmethod
    def print_result(self, generation_number: int):
        raise NotImplementedError
