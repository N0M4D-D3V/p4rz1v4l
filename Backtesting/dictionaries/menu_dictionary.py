from Backtesting.classes.backtest_menu_item import BacktestMenuItem

backtest_menu_options = {
    1: BacktestMenuItem('bollinger_bands', 'Bollinger Bands + RSI Strategy'),
    2: BacktestMenuItem('bollinger_bands', 'Run BB + RSI Strategy with custom parameters', True),
    3: BacktestMenuItem('rsi_ma', 'RSI + EMA Strategy'),
    4: BacktestMenuItem('rsi_ma', 'RSI + EMA Strategy with custom parameters', True),
    5: BacktestMenuItem(None, 'Return'),
}