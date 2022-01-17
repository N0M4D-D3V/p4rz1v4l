import numpy as np

from p4rz1v4l.Backtesting.backtester import Backtester


class Individual:
    def __init__(self, n_genes, gene_ranges):
        self.genes = [np.random.randint(gene_ranges[x][0], gene_ranges[x][1]) for x in range(n_genes)]
        self.backtester = Backtester(
            initial_balance=1000,
            leverage=10,
            trailing_stop_loss=True
        )
