from Config.dictionary.strategy_config_dictionary import exchange_config


class ExchangeQuery:
    def __init__(self, query=exchange_config):
        self.exchange_name = exchange_config.get('exchange_name')
        self.symbol = exchange_config.get('symbol')
        self.timeframe = exchange_config.get('timeframe')
        self.limit = exchange_config.get('limit')