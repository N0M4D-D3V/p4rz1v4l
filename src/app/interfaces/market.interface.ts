import {
  MarketFeeSideType,
  MarketOptionType,
  MarketType,
} from "@custom-types/market.types";
import { Range } from "./common.interface";

export interface Market {
  id: string;
  symbol: string;
  base: string;
  quote: string;
  baseId: string;
  quoteId: string;
  active: boolean;
  type: MarketType;
  spot: boolean;
  margin: boolean;
  future: boolean;
  swap: boolean;
  option: boolean;
  contract: boolean;
  settle?: string;
  settleId?: string;
  contractSize?: number;
  linear: boolean;
  inverse: boolean;
  expiry?: number;
  expiryDatetime?: string;
  strike?: number;
  optionType?: MarketOptionType;
  taker: number;
  maker: number;
  percentage: boolean;
  tierBased: boolean;
  feeSide: MarketFeeSideType;
  precision: Precision;
  limits: Limits;
  info: Record<string, unknown>;
}

export interface Precision {
  price?: number | string;
  amount?: number;
  cost?: number;
}

export interface Limits {
  amount: Range;
  price: Range;
  cost: Range;
  leverage: Range;
}
