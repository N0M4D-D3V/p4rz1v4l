class BacktestMenuItem:
    def __init__(self, strategy_key, display_name, is_configurable: bool = False):
        self.strategy_key = strategy_key
        self.display_name = display_name
        self.is_configurable = is_configurable
