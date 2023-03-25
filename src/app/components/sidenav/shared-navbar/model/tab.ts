import { Observable, of } from "rxjs";

export interface Tab {
  id: number;
  url: string;
  title: string;
  dirty$: Observable<boolean>;
  isCurrentUrl: boolean;
}

export const defaultTab: Tab = {
  id: 0,
  url: "",
  title: "",
  dirty$: of(false),
  isCurrentUrl: false,
};
