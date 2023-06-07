export interface Query {
  symbol: string;
  timeframe?: string;
  since?: number;
  limit?: number;
  params?: {};
}
