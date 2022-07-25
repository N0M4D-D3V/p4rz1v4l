from Data.exchange_query import ExchangeQuery
from Utils.utils import ccxt_ohlcv_to_dataframe
from ccxt import Exchange


class ExchangeService:
    def __init__(self, exchange: Exchange):
        self.exchange = exchange

    def get_all(self, query: ExchangeQuery):
        ohlcv = self.exchange.fetch_ohlcv(query.symbol, query.timeframe, query.limit)
        dataframe = ccxt_ohlcv_to_dataframe(ohlcv)
        return dataframe
