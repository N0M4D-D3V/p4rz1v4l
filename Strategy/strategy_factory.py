from Config.strategy_config_dictionary import strategies


def StrategyFactory(name: str):
    return strategies[name]
