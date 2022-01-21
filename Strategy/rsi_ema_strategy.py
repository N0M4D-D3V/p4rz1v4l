import pandas_ta as ta
from Abstract.abstract_strategy import AbstractStrategy


class RsiEmaStrategy(AbstractStrategy):
    def __init__(self, rsi_oversold=30, rsi_len=14, ma_fast_len=9):
        self.rsi_oversold = rsi_oversold
        self.rsi_len = rsi_len
        self.ma_fast_len = ma_fast_len
        self.dataframe = None

    def set_up(self, df):
        df['fast_ema'] = ta.ema(df['close'], length=self.ma_fast_len, offset=None, append=True)
        df['rsi'] = ta.rsi(close=df['close'], length=self.rsi_len)
        self.dataframe = df

    def check_long_signal(self, candle=None):
        df = self.dataframe
        if candle is None:
            candle = len(df)

        current_rsi = df['rsi'].iloc[candle]
        current_fast_ema = df['fast_ema'].iloc[candle]
        close = df['close']

        if (current_rsi > self.rsi_oversold) and \
            (current_fast_ema < close[candle]):
            return True
        return False

    def check_short_signal(self, i=None):
        return False
