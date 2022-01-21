from Strategy.bollinger_bands_strategy import BollingerBandsStrategy
from Strategy.rsi_ema_strategy import RsiEmaStrategy

strategies = {
    "bollinger_bands": BollingerBandsStrategy(),
    "rsi_ma": RsiEmaStrategy(),
}


def StrategyFactory(name: str):
    print(name)
    return strategies[name]
