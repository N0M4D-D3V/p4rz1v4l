import pandas


# Transform the data received from one Exchange (binance) to a more friendly format
def ccxt_ohlcv_to_dataframe(ohlcv):
    df = pandas.DataFrame(ohlcv)
    df.columns = ['time', 'open', 'high', 'low', 'close', 'volume']
    df['date'] = pandas.to_datetime(df['time'] * 1000000, infer_datetime_format=True)
    return df


# Gives format to a float value and returns it as string.
def format_float(value: float) -> str:
    return "{:,.2f}".format(float(value))


# Gives format to a rate value and returns it as string.
def format_rate(value: float) -> str:
    return "{:.2%}".format(float(value))
