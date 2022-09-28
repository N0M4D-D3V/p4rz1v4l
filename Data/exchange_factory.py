import ccxt


class ExchangeFactory:

    def __init__(self, exchange='binance'):
        self.exchange_name = exchange

    # Gets an instance of an exchange depending on the configured param
    # passed in the constructor.
    def get_instance(self):
        if self.exchange_name == 'binance':
            return ccxt.binance()
        else:
            print('Exchange not supported =/')
