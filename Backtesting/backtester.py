from Abstract.abstract_backtester import AbstractBacktester
from Abstract.abstract_strategy import AbstractStrategy


class Backtester(AbstractBacktester):
    def __init__(self, initial_balance=1000, leverage=10, trailing_stop_loss=False):
        self.initial_balance = initial_balance
        self.balance = initial_balance
        self.amount = 0
        self.leverage = leverage
        self.fee_cost = 0.02 / 100

        self.inv = self.balance * 0.01 * self.leverage

        self.profit = []
        self.drawdown = []
        self.winner_operations = 0
        self.losser_operations = 0

        self.num_operations = 0
        self.num_longs = 0
        self.num_shorts = 0

        self.is_long_open = False
        self.is_short_open = False

        self.trailing_stop_loss = trailing_stop_loss
        self.from_opened = 0

        self.long_open_price = 0
        self.short_open_price = 0

        self.take_profit_price = 0
        self.stop_loss_price = 0

    def reset_results(self):
        self.balance = self.initial_balance
        self.amount = 0
        self.profit = []
        self.drawdown = []
        self.winner_operations = 0
        self.losser_operations = 0
        self.num_operations = 0
        self.num_longs = 0
        self.num_shorts = 0
        self.is_long_open = False
        self.is_short_open = False
        self.from_opened = 0

    def open_position(self, price, side, from_opened=0):
        self.num_operations += 1

        if side == 'long':
            self.num_longs += 1

            if self.is_short_open:
                self.close_position(price)

            if self.is_long_open:
                self.long_open_price = (self.long_open_price + price) / 2
                self.amount += self.inv / price

            else:
                self.is_long_open = True
                self.long_open_price = price
                self.amount = self.inv / price

        elif side == 'short':
            self.num_shorts += 1

            if self.is_long_open:
                self.close_position(price)

            if self.is_short_open:
                self.short_open_price = (self.short_open_price + price) / 2
                self.amount += self.inv / price

            else:
                self.is_short_open = True
                self.short_open_price = price
                self.amount = self.inv / price

        if self.trailing_stop_loss:
            self.from_opened = from_opened

    def close_position(self, price):
        self.num_operations += 1
        result = 0

        if self.is_long_open:
            result = self.amount * (price - self.long_open_price)
            self.is_long_open = False
            self.long_open_price = 0

        elif self.is_short_open:
            result = self.amount * (self.short_open_price - price)
            self.is_short_open = False
            self.short_open_price = 0

        self.profit.append(result)
        self.balance += result

        if result > 0:
            self.winner_operations += 1
            self.drawdown.append(0)
        else:
            self.losser_operations += 1
            self.drawdown.append(result)

        self.take_profit_price = 0
        self.stop_loss_price = 0

    def set_take_profit(self, price, tp_long=1.05, tp_short=0.95):
        if self.is_long_open:
            self.take_profit_price = price * tp_long

        elif self.is_short_open:
            self.take_profit_price = price * tp_short

    def set_stop_loss(self, price, sl_long=0.98, sl_short=1.02):
        if self.is_long_open:
            self.stop_loss_price = price * sl_long

        if self.is_short_open:
            self.stop_loss_price = price * sl_short

    def return_results(self, symbol, start_date, end_date):
        operations = self.num_operations
        longs = self.num_longs
        shorts = self.num_shorts
        winners = self.winner_operations
        lossers = self.losser_operations

        profit = sum(self.profit)
        drawdown = sum(self.drawdown)
        fees = (abs(profit) * self.fee_cost * operations)
        profit_after_fees = profit - fees

        winrate = winners / (winners + lossers)
        fitness_function = (longs + shorts) * (profit - abs(drawdown)) * winrate / operations

        results = {
            'symbol': symbol,
            'start_date': start_date,
            'end_date': end_date,
            'balance': self.balance,
            'profit': profit,
            'drawdown': drawdown,
            'profit_after_fees': profit_after_fees,
            'num_operations': operations,
            'num_long': longs,
            'num_shorts': shorts,
            'winner_operations': winners,
            'losser_operations': lossers
        }

        if operations > 0 and (winners + lossers) > 0:
            results['winrate'] = winrate
            results['fitness_function'] = fitness_function

        else:
            results['winrate'] = 0
            results['fitness_function'] = 0
        return results

    def __backtesting__(self, df, strategy: AbstractStrategy):

        high = df['high']
        close = df['close']
        low = df['low']

        for i in range(len(df)):
            if self.balance > 0:

                if strategy.check_long_signal(i):
                    self.open_position(price=close[i], side='long', from_opened=i)

                    self.set_take_profit(price=close[i], tp_long=1.03)
                    self.set_stop_loss(price=close[i], sl_long=0.99)

                elif strategy.check_short_signal(i):
                    self.open_position(price=close[i], side='short', from_opened=i)
                    self.set_take_profit(price=close[i], tp_short=0.97)
                    self.set_stop_loss(price=close[i], sl_short=1.01)
                else:

                    if self.trailing_stop_loss and (self.is_long_open or self.is_short_open):
                        new_max = high[self.from_opened:i].max()
                        previous_stop_loss = self.stop_loss_price

                        self.set_stop_loss(price=new_max)

                        if previous_stop_loss > self.stop_loss_price:
                            self.stop_loss_price = previous_stop_loss

                    if self.is_long_open:

                        if high[i] >= self.take_profit_price:
                            self.close_position(price=self.take_profit_price)
                        elif low[i] <= self.stop_loss_price:
                            self.close_position(price=self.stop_loss_price)

                    elif self.is_short_open:

                        if high[i] >= self.stop_loss_price:
                            self.close_position(price=self.stop_loss_price)
                        elif low[i] <= self.take_profit_price:
                            self.close_position(price=self.take_profit_price)
