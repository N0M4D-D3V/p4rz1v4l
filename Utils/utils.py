import pandas


def ccxt_ohlcv_to_dataframe(ohlcv):
    df = pandas.DataFrame(ohlcv)
    df.columns = ['time', 'open', 'high', 'low', 'close', 'volume']
    df['date'] = pandas.to_datetime(df['time'] * 1000000, infer_datetime_format=True)
    return df


def format_float(value: float):
    return "{:,.2f}".format(float(value))


def format_rate(value: float):
    return "{:.2%}".format(float(value))
