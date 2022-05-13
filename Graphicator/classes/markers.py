import string

from strenum import StrEnum

from Config.dictionary.colors import Colors
from Config.dictionary.operation_type import OperationType


class Markers(StrEnum):
    OPEN = 'star-triangle-up'
    CLOSE = 'star-triangle-down'
    STOPLOSS = 'circle'


class MarkerConfig:
    def __init__(self, name: string, color, symbol):
        self.name = name
        self.color = color
        self.symbol = symbol


class MarkerConfigOps:
    def __init__(self, opn, close):
        self.open = opn
        self.close = close


_configurations = [
    MarkerConfig(OperationType.LONG_OPEN, Colors.WHITE, Markers.OPEN),
    MarkerConfig(OperationType.LONG_CLOSE, Colors.GREY, Markers.CLOSE),
    MarkerConfig(OperationType.SHORT_OPEN, Colors.ORANGE, Markers.OPEN),
    MarkerConfig(OperationType.SHORT_CLOSE, Colors.DARK_ORANGE, Markers.CLOSE),
    MarkerConfig(OperationType.LONG_STOPLOSS_CLOSE, Colors.DARK_GREY, Markers.STOPLOSS),
    MarkerConfig(OperationType.SHORT_STOPLOSS_CLOSE, Colors.DARK_RED, Markers.STOPLOSS),
]


def get_config_by_operation(operation: string) -> MarkerConfigOps:
    items = list(filter(lambda config: operation in config.name, _configurations))
    return MarkerConfigOps(items[0], items[1])
