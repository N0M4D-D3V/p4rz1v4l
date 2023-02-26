import { Range } from "./common.interface";

export interface Network {
  id: string;
  network: string;
  name: string;
  active: boolean;
  fee: number;
  precision: number;
  deposit: boolean;
  withdraw: boolean;
  limits: Limits;
  info: any; // type should be defined based on the structure of the object
}

export interface Limits {
  amount: Range;
  withdraw: any; // type should be defined based on the structure of the object
  deposit: any; // type should be defined based on the structure of the object
}
