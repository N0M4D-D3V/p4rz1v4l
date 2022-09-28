from Config.dictionary.strategy_config_dictionary import exchange_config


class ExchangeQuery:
    def __init__(self, query=exchange_config):
        self.exchange_name = query.get('exchange_name')
        self.symbol = query.get('symbol')
        self.timeframe = query.get('timeframe')
        self.limit = query.get('limit')
