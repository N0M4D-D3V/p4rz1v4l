import plotly.graph_objects as graph_objects

from Graphicator.classes.markers import MarkerConfig


# Builds an EMA20 with the provided dataset.
# ema20 column must be in dataset for drawing.
def build_ema20_graph(dataset):
    return graph_objects.Scatter(
        name='EMA20',
        x=dataset.index,
        y=dataset['ema20'],
        line=dict(color='cyan', width=1)
    )


# Builds an EMA100 with the provided dataset.
# ema100 column must be in dataset for drawing.
def build_ema100_graph(dataset):
    return graph_objects.Scatter(
        name='EMA100',
        x=dataset.index,
        y=dataset['ema100'],
        line=dict(color='white', width=1)
    )


# Builds a PRICE with the provided dataset.
# open/high/low/close columns must be in dataset for drawing.
def build_price_graph(dataset):
    return graph_objects.Candlestick(
        name='Open/Close',
        x=dataset.index,
        open=dataset['open'],
        high=dataset['high'],
        low=dataset['low'],
        close=dataset['close']
    )


# Builds an VOLUME with the provided dataset.
# volume column must be in dataset for drawing.
def build_volume_graph(dataset):
    return graph_objects.Bar(
        name='Volume',
        x=dataset.index,
        y=dataset['volume']
    )


# Builds operation marker. Needs column operation_price
# for drawing.
def build_marker_graph(dataset, config: MarkerConfig):
    return graph_objects.Scatter(
        x=dataset.index,
        y=dataset['operation_price'],
        mode='markers',
        name=config.name,
        marker=dict(
            size=15,
            color=config.color,
            symbol=config.symbol
        )
    )
