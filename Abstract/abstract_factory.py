import abc


class AbstractFactory(metaclass=abc.ABCMeta):

    def __init__(self, strategy_key: str):
        self.strategy_key = strategy_key

    # Returns an instance of a strategy depending on the
    # self.strategy_key param received in constructor.
    def get_instance(self):
        if self.strategy_key == 'bollinger_bands':
            return self._get_bb_instance()
        if self.strategy_key == 'rsi_ma':
            return self._get_rsi_ema_instance()

    # Gets an instance of BB strategy.
    @abc.abstractmethod
    def _get_bb_instance(self):
        raise NotImplementedError

    # Gets an instance of RSI/EMA strategy.
    @abc.abstractmethod
    def _get_rsi_ema_instance(self):
        raise NotImplementedError
