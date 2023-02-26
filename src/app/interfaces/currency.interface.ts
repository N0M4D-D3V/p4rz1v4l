import { Range } from "./common.interface";

export interface Currency {
  id: string; // string literal for referencing within an exchange
  code: string; // uppercase unified string literal code the currency
  name?: string; // string, human-readable name, if specified
  active: boolean; // boolean, currency status (tradeable and withdrawable)
  fee: number; // withdrawal fee, flat
  precision: number; // number of decimal digits "after the dot" (depends on exchange.precisionMode)
  deposit: boolean; // boolean, deposits are available
  withdraw: boolean; // boolean, withdraws are available
  limits: {
    amount: Range;
    withdraw: {
      [networkId: string]: {
        fee: number;
        min: number;
        max: number;
      };
    };
    deposit: {
      [networkId: string]: {
        fee: number;
        min: number;
        max: number;
      };
    };
  };
  networks?: {
    [networkId: string]: {
      // network specific properties
    };
  };
  info?: {
    // the original unparsed currency info from the exchange
  };
}
