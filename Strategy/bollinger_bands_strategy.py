import pandas_ta as ta

from Abstract.abstract_strategy import AbstractStrategy


class BollingerBandsStrategy(AbstractStrategy):
    def __init__(self, bb_len=20, n_std=2.0, rsi_len=14, rsi_overbought=60, rsi_oversold=40):
        self.bb_len = bb_len
        self.n_std = n_std
        self.rsi_len = rsi_len
        self.rsi_overbought = rsi_overbought
        self.rsi_oversold = rsi_oversold
        self.dataframe = None

    def set_up(self, df):
        bb = ta.bbands(
            close=df['close'],
            length=self.bb_len,
            std=self.n_std
        )

        df['lbb'] = bb.iloc[:, 0]
        df['mbb'] = bb.iloc[:, 1]
        df['ubb'] = bb.iloc[:, 2]

        df['rsi'] = ta.rsi(close=df['close'], length=self.rsi_len)

        self.dataframe = df

    def check_long_signal(self, i=None):
        df = self.dataframe

        if i is None:
            i = len(df)

        if (df['rsi'].iloc[i] < self.rsi_overbought) and \
                (df['rsi'].iloc[i] > self.rsi_oversold) and \
                (df['low'].iloc[i - 1] < df['lbb'].iloc[i - 1]) and \
                (df['low'].iloc[i] > df['lbb'].iloc[i]):
            return True
        return False

    def check_short_signal(self, i=None):
        df = self.dataframe

        if i is None:
            i = len(df)

        if (df['rsi'].iloc[i] < self.rsi_overbought) and \
                (df['rsi'].iloc[i] > self.rsi_oversold) and \
                (df['high'].iloc[i - 1] > df['ubb'].iloc[i - 1]) and \
                (df['high'].iloc[i] < df['ubb'].iloc[i]):
            return True
        return False
