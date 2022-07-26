import abc


class AbstractStrategy(metaclass=abc.ABCMeta):

    # Prepare the strategy. Sets the params in pre-executing sentences.
    @abc.abstractmethod
    def set_up(self, dataframe):
        raise NotImplementedError

    # Checks if long signal is OK.
    @abc.abstractmethod
    def check_long_signal(self, i):
        raise NotImplementedError

    # Checks if short signal is OK.
    @abc.abstractmethod
    def check_short_signal(self, i):
        raise NotImplementedError

    @abc.abstractmethod
    def param_request(self):
        raise NotImplementedError
