from Config.clases.backtester_menu_item import BacktestMenuItem
from Strategy.bollinger_bands_strategy import BollingerBandsStrategy
from Strategy.rsi_ema_strategy import RsiEmaStrategy

backtest_menu_options = {
    1: BacktestMenuItem('bollinger_bands', 'Bollinger Bands + RSI Strategy'),
    2: BacktestMenuItem('bollinger_bands', 'Run BB + RSI Strategy with custom parameters', True),
    3: BacktestMenuItem('rsi_ma', 'RSI + EMA Strategy'),
    4: BacktestMenuItem('rsi_ma', 'RSI + EMA Strategy with custom parameters', True),
    5: BacktestMenuItem(None, 'Return'),
}

strategies = {
    "bollinger_bands": BollingerBandsStrategy(),
    "rsi_ma": RsiEmaStrategy(),
}
