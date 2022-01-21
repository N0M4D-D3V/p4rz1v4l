from Config.strategy_config_dictionary import strategies


def StrategyFactory(strategy_key: str):
    return strategies[strategy_key]
