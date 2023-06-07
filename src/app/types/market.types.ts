import { AVAILABLE_EXCHANGES } from "../shared/common/available-indicator.list";
export type MarketType = "spot" | "future" | "swap" | "option";
export type MarketOptionType = "call" | "put";
export type MarketFeeSideType = "get" | "give" | "base" | "quote" | "other";

export type ExchangeKey = "binance";
