import pandas
import pandas_ta
from plotly.subplots import make_subplots

from Graphicator.classes.graph_builder import *
from Graphicator.classes.markers import *


class Graph:
    def __init__(self, dataset):
        self.dataset = dataset
        self._figure = None

    def show(self):
        self._transform_dataframe()
        self._create_figure()
        self._figure.show()

    def _create_figure(self):
        self._figure = make_subplots(specs=[[{"secondary_y": True}]])

        self._draw_price()
        #self._draw_volume()
        self._draw_ema_100()
        self._draw_ema_20()
        self._draw_operations()
        self._configure_layout()

    def _draw_price(self):
        self._figure.add_trace(build_price_graph(self.dataset))

    def _draw_volume(self):
        self._figure.add_trace(build_volume_graph(self.dataset), secondary_y=False)

    def _draw_ema_100(self):
        self._figure.add_trace(build_ema100_graph(self.dataset))

    def _draw_ema_20(self):
        self._figure.add_trace(build_ema20_graph(self.dataset))

    def _draw_operations(self):
        self._draw_short_ops()
        self._draw_long_ops()
        self._draw_stoploss_ops()

    def _draw_long_ops(self):
        open_ops = self.dataset[self.dataset['operation'] == OperationType.LONG_OPEN]
        close_ops = self.dataset[self.dataset['operation'] == OperationType.LONG_CLOSE]

        conf: MarkerConfigOps = get_config_by_operation(OperationType.LONG)

        self._draw_markers(open_ops, conf.open)
        self._draw_markers(close_ops, conf.close)

    def _draw_short_ops(self):
        open_ops = self.dataset[self.dataset['operation'] == OperationType.SHORT_OPEN]
        close_ops = self.dataset[self.dataset['operation'] == OperationType.SHORT_CLOSE]

        conf: MarkerConfigOps = get_config_by_operation(OperationType.SHORT)

        self._draw_markers(open_ops, conf.open)
        self._draw_markers(close_ops, conf.close)

    def _draw_stoploss_ops(self):
        long_ops = self.dataset[self.dataset['operation'] == OperationType.LONG_STOPLOSS_CLOSE]
        short_ops = self.dataset[self.dataset['operation'] == OperationType.SHORT_STOPLOSS_CLOSE]

        conf: MarkerConfigOps = get_config_by_operation(OperationType.STOPLOSS)

        self._draw_markers(long_ops, conf.open)
        self._draw_markers(short_ops, conf.close)

    def _draw_markers(self, dataset, config: MarkerConfig):
        self._figure.add_trace(build_marker_graph(dataset, config))

    def _configure_layout(self):
        self._figure.layout.yaxis.color = 'red'
        self._figure.update_layout(
            xaxis_rangeslider_visible=False,
            showlegend=True,
            template="plotly_dark"
        )

    def _transform_dataframe(self):
        self.dataset['date'] = pandas.to_datetime(self.dataset['date'])
        self.dataset = self.dataset.set_index('date')

        self.dataset['ema100'] = pandas_ta.ema(self.dataset['close'], length=100, offset=None, append=True)
        self.dataset['ema20'] = pandas_ta.ema(self.dataset['close'], length=20, offset=None, append=True)
