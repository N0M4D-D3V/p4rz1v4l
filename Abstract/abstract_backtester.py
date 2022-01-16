import abc


class AbstractBacktester(metaclass=abc.ABCMeta):

    @abc.abstractmethod
    def __backtesting__(self, dataframe, strategy):
        raise NotImplementedError

    @abc.abstractmethod
    def open_position(self, price: float, side: str, stoploss_from_open: float):
        raise NotImplementedError

    @abc.abstractmethod
    def close_position(self, price: float):
        raise NotImplementedError

    @abc.abstractmethod
    def set_take_profit(self, price: float, take_profit_long: float, take_profit_short: float):
        raise NotImplementedError

    @abc.abstractmethod
    def set_stop_loss(self, price: float, take_profit_long: float, take_profit_short: float):
        raise NotImplementedError

    @abc.abstractmethod
    def return_results(self, symbol: str, start_date: str, end_date: str):
        raise NotImplementedError

    @abc.abstractmethod
    def reset_results(self):
        raise NotImplementedError
