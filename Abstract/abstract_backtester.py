import abc


class AbstractBacktester(metaclass=abc.ABCMeta):

    # Executes the test process
    @abc.abstractmethod
    def backtesting(self, dataframe, strategy):
        raise NotImplementedError

    # Opens a long/short position
    @abc.abstractmethod
    def open_position(self, price: float, side: str, stoploss_from_open: float):
        raise NotImplementedError

    # Closes a long/short position
    @abc.abstractmethod
    def close_position(self, price: float):
        raise NotImplementedError

    # Sets take profit value
    @abc.abstractmethod
    def set_take_profit(self, price: float, take_profit_long: float, take_profit_short: float):
        raise NotImplementedError

    # Set the stop loss value
    @abc.abstractmethod
    def set_stop_loss(self, price: float, take_profit_long: float, take_profit_short: float):
        raise NotImplementedError

    # Formats and returns the results
    @abc.abstractmethod
    def return_results(self, symbol: str, start_date: str, end_date: str):
        raise NotImplementedError

    # Reset result values 4 a new test
    @abc.abstractmethod
    def reset_results(self):
        raise NotImplementedError
