import { Observable, of } from 'rxjs';

export interface Tab {
  url: string;
  title: string;
  dirty$: Observable<boolean>;
  isCurrentUrl: boolean;
}

export const defaultTab: Tab = {
  url: '',
  title: '',
  dirty$: of(false),
  isCurrentUrl: false
};