export interface DataTransfer<T> {
  index: number;
  data: T;
  action?: DataTransferAction;
}

export enum DataTransferAction {
  DEL,
  ADD,
  EDIT,
  SAVE,
}
