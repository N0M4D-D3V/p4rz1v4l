export type DbStructureType = { [tableName: string]: string };

export const DB_NAME: string = "ng-dexie-db";
export const DB_STRUCTURE: DbStructureType = {
  backtestingCandles: "++id",
};
