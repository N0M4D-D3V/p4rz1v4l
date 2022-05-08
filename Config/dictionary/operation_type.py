from strenum import StrEnum


class OperationType(StrEnum):
    LONG = 'long'
    LONG_OPEN = 'long_open'
    LONG_CLOSE = 'long_close'
    LONG_STOPLOSS_CLOSE = 'long_stoploss_close'

    SHORT = 'short'
    SHORT_OPEN = 'short_open'
    SHORT_CLOSE = 'short_close'
    SHORT_STOPLOSS_CLOSE = 'short_stoploss_close'

    STOPLOSS = 'stoploss'


