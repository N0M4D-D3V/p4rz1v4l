export interface Client {
  name?: string;
  email?: string;
  phone?: string;
}

export interface BotItem {
  description: string;
  price: number;
}

export interface BotDetail {
  id?: number;
  client?: Client;
  createdAt?: string;
  lastModified?: string;
  items?: BotItem[];
  total?: number;
  value?: string;
}
