import pandas
import plotly.graph_objects as graph_objects
from plotly.subplots import make_subplots


class Graph:
    def __init__(self, dataset):
        self.dataset = dataset
        self._figure = None

    def show(self):
        self._transform_date()
        self._create_figure()
        self._figure.show()

    def _create_figure(self):
        self._figure = make_subplots(
            rows=2, cols=1,
            row_heights=[0.8, 0.2],
            shared_xaxes=True
        )

        self._draw_price()
        self._draw_volume()
        self._configure_layout()

    def _draw_price(self):
        self._figure.add_trace(graph_objects.Candlestick(
            name='Open/Close',
            x=self.dataset.index,
            open=self.dataset['open'],
            high=self.dataset['high'],
            low=self.dataset['low'],
            close=self.dataset['close']
        ), row=1, col=1)

    def _draw_volume(self):
        self._figure.add_trace(graph_objects.Bar(
            name='Volume',
            x=self.dataset.index,
            y=self.dataset['volume']
        ), row=2, col=1)

    def _configure_layout(self):
        self._figure.update_layout(
            xaxis_rangeslider_visible=False,
            showlegend=True,
            template="plotly_dark"
        )

    def _transform_date(self):
        self.dataset['date'] = pandas.to_datetime(self.dataset['date'])
        self.dataset = self.dataset.set_index('date')
