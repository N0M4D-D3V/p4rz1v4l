from Abstract.abstract_backtester import AbstractBacktester
from Abstract.abstract_strategy import AbstractStrategy
from Config.dictionary.operation_type import OperationType


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

    def open_position(self, price, side: OperationType, from_opened=0):
        self.num_operations += 1

        if side == OperationType.LONG:
            self._open_long(price)

        elif side == OperationType.SHORT:
            self._open_short(price)

        if self.trailing_stop_loss:
            self.from_opened = from_opened

    def _open_long(self, price):
        self.num_longs += 1

        # if short position is open, then closes it
        if self.is_short_open:
            self.close_position(price)

        # if long position is open, updates prices and amount
        if self.is_long_open:
            self.long_open_price = (self.long_open_price + price) / 2
            self.amount += self.inv / price

        # if no short/long operation added, then it opens one.
        else:
            self.is_long_open = True
            self.long_open_price = price
            self.amount = self.inv / price

    def _open_short(self, price):
        self.num_shorts += 1

        # if long is open, closes it
        if self.is_long_open:
            self.close_position(price)

        # if short is open, updates it
        if self.is_short_open:
            self.short_open_price = (self.short_open_price + price) / 2
            self.amount += self.inv / price

        # if no long/short ops open, then open one short operation
        else:
            self.is_short_open = True
            self.short_open_price = price
            self.amount = self.inv / price

    def close_position(self, price):
        result: float = 0
        self.num_operations += 1

        if self.is_long_open:
            result = self._close_long(price)

        elif self.is_short_open:
            result = self._close_short(price)

        self.profit.append(result)
        self.balance += result

        if result > 0:
            self._add_winner_operation()
        else:
            self._add_losser_operation(result)

        self.take_profit_price = 0
        self.stop_loss_price = 0

    def _add_winner_operation(self):
        self.winner_operations += 1
        self.drawdown.append(0)

    def _add_losser_operation(self, result: float):
        self.losser_operations += 1
        self.drawdown.append(result)

    def _close_long(self, price) -> float:
        result: float = self.amount * (price - self.long_open_price)
        self.is_long_open = False
        self.long_open_price = 0
        return result

    def _close_short(self, price) -> float:
        result: float = self.amount * (self.short_open_price - price)
        self.is_short_open = False
        self.short_open_price = 0
        return result

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
        profit: float = sum(self.profit)
        drawdown: float = sum(self.drawdown)
        fees: float = (abs(profit) * self.fee_cost * self.num_operations)
        profit_after_fees: float = profit - fees

        results = {
            'symbol': symbol,
            'start_date': start_date,
            'end_date': end_date,
            'balance': self.balance,
            'profit': profit,
            'drawdown': drawdown,
            'profit_after_fees': profit_after_fees,
            'num_operations': self.num_operations,
            'num_long': self.num_longs,
            'num_shorts': self.num_shorts,
            'winner_operations': self.winner_operations,
            'losser_operations': self.losser_operations
        }

        if self.num_operations > 0 and (self.winner_operations + self.losser_operations) > 0:
            winrate: float = self._calc_winrate()
            fitness_function: float = self._calc_fitness(profit, drawdown, winrate)
            results['winrate'] = winrate
            results['fitness_function'] = fitness_function

        else:
            results['winrate'] = 0
            results['fitness_function'] = 0

        return results

    def _calc_winrate(self) -> float:
        return self.winner_operations / (self.winner_operations + self.losser_operations)

    def _calc_fitness(self, profit: float, drawdown: float, winrate: float) -> float:
        return (self.num_longs + self.num_shorts) * (profit - abs(drawdown)) * winrate / self.num_operations

    def __backtesting__(self, df, strategy: AbstractStrategy):
        df['operation'] = ""
        df['operation_price'] = ""

        high_price = df['high_price']
        close_price = df['close_price']
        low_price = df['low_price']
        operations = df['operation']
        operation_prices = df['operation_price']

        for i in range(len(df)):
            if self.balance > 0:
                if strategy.check_long_signal(i):
                    operations[i] = OperationType.LONG_OPEN
                    operation_prices[i] = close_price[i]
                    self.open_position(price=close_price[i], side=OperationType.LONG, from_opened=i)
                    self.set_take_profit(price=close_price[i], tp_long=1.03)
                    self.set_stop_loss(price=close_price[i], sl_long=0.99)

                elif strategy.check_short_signal(i):
                    operations[i] = OperationType.SHORT_OPEN
                    operation_prices[i] = close_price[i]
                    self.open_position(price=close_price[i], side=OperationType.SHORT, from_opened=i)
                    self.set_take_profit(price=close_price[i], tp_short=0.97)
                    self.set_stop_loss(price=close_price[i], sl_short=1.01)

                else:
                    if self.trailing_stop_loss and (self.is_long_open or self.is_short_open):
                        new_max = high_price[self.from_opened:i].max()
                        previous_stop_loss = self.stop_loss_price

                        self.set_stop_loss(price=new_max)

                        if previous_stop_loss > self.stop_loss_price:
                            self.stop_loss_price = previous_stop_loss

                    if self.is_long_open:
                        if high_price[i] >= self.take_profit_price:
                            operations[i] = OperationType.LONG_CLOSE
                            operation_prices[i] = self.take_profit_price
                            self.close_position(price=self.take_profit_price)
                        elif low_price[i] <= self.stop_loss_price:
                            operations[i] = OperationType.LONG_STOPLOSS_CLOSE
                            operation_prices[i] = self.stop_loss_price
                            self.close_position(price=self.stop_loss_price)

                    elif self.is_short_open:
                        if high_price[i] >= self.stop_loss_price:
                            operations[i] = OperationType.SHORT_STOPLOSS_CLOSE
                            operation_prices[i] = self.stop_loss_price
                            self.close_position(price=self.stop_loss_price)
                        elif low_price[i] <= self.take_profit_price:
                            operations[i] = OperationType.SHORT_CLOSE
                            operation_prices[i] = self.take_profit_price
                            self.close_position(price=self.take_profit_price)

        return df
