export interface Exchange {
  id: string; // lowercase string exchange id
  name: string; // human-readable string
  countries: string[]; // array of ISO country codes
  urls: Urls;
  version: string; // string ending with digits
  api: { [key: string]: any }; // dictionary of api endpoints
  has: ExchangeCapabilities;
  timeframes: { [key: string]: string } | {}; // empty if the exchange.has['fetchOHLCV'] !== true
  timeout: number; // number in milliseconds
  rateLimit: number; // number in milliseconds
  userAgent: string; // string, HTTP User-Agent header
  verbose: boolean; // boolean, output error details
  markets: { [key: string]: any }; // dictionary of markets/pairs by symbol
  symbols: string[]; // sorted list of string symbols (traded pairs)
  currencies: { [key: string]: any }; // dictionary of currencies by currency code
  markets_by_id: { [key: string]: any[] }; // dictionary of array of dictionaries (markets) by id
  currencies_by_id: { [key: string]: any }; // dictionary of dictionaries (markets) by id
  apiKey?: string; // string public apiKey (ASCII, hex, Base64, ...)
  secret?: string; // string private secret key
  password?: string; // string password
  uid?: string; // string user id
  options: { [key: string]: any }; // exchange-specific options
  // ... other properties here ...
}

export interface Urls {
  api: string | { [key: string]: string }; // string or dictionary of base API URLs
  www: string; // string website URL
  doc: string | string[]; // string URL or array of URLs
}

export interface ExchangeCapabilities {
  CORS: boolean;
  publicAPI: boolean;
  privateAPI: boolean;
  cancelOrder: boolean;
  createDepositAddress: boolean;
  createOrder: boolean;
  fetchBalance: boolean;
  fetchCanceledOrders: boolean;
  fetchClosedOrder: boolean;
  fetchClosedOrders: boolean;
  fetchCurrencies: boolean;
  fetchDepositAddress: boolean;
  fetchMarkets: boolean;
  fetchMyTrades: boolean;
  fetchOHLCV: boolean;
  fetchOpenOrder: boolean;
  fetchOpenOrders: boolean;
  fetchOrder: boolean;
  fetchOrderBook: boolean;
  fetchOrders: boolean;
  fetchStatus: string;
  fetchTicker: boolean;
  fetchTickers: boolean;
  fetchBidsAsks: boolean;
  fetchTrades: boolean;
  withdraw: boolean;
}
