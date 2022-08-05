from Config.dictionary.strategy_config_dictionary import strategies


# Gets a strategy instance by key.
def StrategyFactory(strategy_key: str):
    return strategies[strategy_key]
